/**
 * sign.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 21/8/14
 * @update: 22/8/14
 */

// Module dependencies
var validator = require('validator');
var xss = require('xss');
var crypto = require('crypto');

var config = require('../config').config;
var User = require('../proxy').User;

var notJump = [
  '/reset_pass',
  '/signup'
];

exports.showSignup = function(req, res) {
  res.render('sign/signup')
};


exports.showLogin = function(req, res) {
  req.session._loginReferer = req.headers.referer;
  res.render('sign/signin');
};

/**
 * 注册
 * @param req
 * @param res
 * @param next
 */
exports.signup = function(req, res, next) {
  // 用户名
  var name = validator.trim(req.param('name'));
      name = xss(name);

  // 登录名
  var nickname = name.toLowerCase();

  // 密码
  var pass = validator.trim(req.param('pass'));
      pass = xss(pass);

  // 重复密码
  var re_pass = validator.trim(req.param('re_pass'));
      re_pass = xss(re_pass);

  if (name === '' || pass === '' || re_pass === '') {
    res.render('sign/signup', {error: '注册信息不全', name: name});

    return;
  }

  if (name.length < 5) {
    res.render('sign/signup', {error: '用户名长度不得低于5个字符', name: name});

    return;
  }

  if (!validator.isAlphanumeric(name)) {
    res.render('sign/signup', {error: '用户名中只能包含 a-z, A-Z, 0-9', name: name});

    return;
  }

  if (pass !== re_pass) {
    res.render('sign/signup', {error: '两次输入的密码不一致', name: name});

    return;
  }

  // 查询是否已被注册
  User.getUserByQuery(name, function(err, user) {
    if (err) return next(err);

    if (user.length > 0) {
      res.render('sign/signup', {error: '用户名已被注册', name: name});
      return;
    }

    // 加密
    pass = md5(pass);

    User.newAndSave(name, nickname, pass, function(err) {
      if (err) return next(err);

      return res.render('sign/signup', {
        success: '欢迎加入' + config.name
      });
    });
  });
};

/**
 * 登录
 *
 * @param req
 * @param res
 * @param next
 */
exports.login = function(req, res, next) {
  var nickname = validator.trim(req.param('name')).toLowerCase(),
      pass = validator.trim(req.param('pass'));

  pass = md5(pass);

  if (nickname === '' || pass === '') {
    return res.render('sign/signin', {error: '登录信息不全'});
  }

  User.getUserByLoginName(nickname, function(err, user) {
    if (err) return next(err);

    if (!user) return res.render('sign/signin', {error: '此用户不存在'});

    if (pass !== user.pass) return res.render('sign/signin', {error: '密码错误'});

    gen_session(user, res);

    var refer = req.session._loginReferer || 'home';

    for(var i = 0; i < notJump.length; i++) {
      if (refer.indexOf(notJump[i])) {
        refer = 'home';
        break;
      }
    }

    res.redirect(refer);
  });
};

/**
 * 登出
 * @param req
 * @param res
 */
exports.signout = function(req, res) {
  req.session.destroy();
  res.clearCookie(config.auth_cookie_name, { path: '/' });
  res.redirect(req.headers.referer || 'home');
};

function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, {
    path: '/',
    maxAge: 1000 * 60 * 60 * 30
  });
}

exports.gen_session = gen_session;

function md5(str) {
  var md5sum = crypto.createHash('md5');

  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}