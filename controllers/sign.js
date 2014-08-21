/**
 * sign.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 21/8/14
 * @update: 21/8/14
 */

// Module dependencies
var check = require('validator').check;
var sanitize = require('validator').sanitize;
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
  var name = sanitize(req.body.name).trim();
      name = sanitize(name).xss();

  // 登录名
  var nickname = name.toLowerCase();

  // 密码
  var pass = sanitize(req.body.pass).trim();
      pass = sanitize(pass).xss();

  // 重复密码
  var re_pass = sanitize(req.body.re_pass).trim();
      re_pass = sanitize(re_pass).xss();

  if (name === '' || pass === '' || re_pass === '') {
    res.render('sign/signup', {error: '注册信息不全', name: name});

    return;
  }

  if (name.length < 5) {
    res.render('sign/signup', {error: '用户名长度不得低于5个字符', name: name});

    return;
  }

  try {
    check(name, '用户名只能使用0-9, a-z, A-Z').isAlphanumeric();
  } catch (e) {
    res.render('sign/signup', {error: e.message, name: name});

    return;
  }

  if (pass !== re_pass) {
    res.render('sign/signup', {error: '两次输入的密码不一致', name: name});

    return;
  }

  // 查询是否已被注册
  User.getUsersByQuery({'$or': [
    {'nickname': nickname}
  ]}, {}, function(err, users) {
    if (err) return next(err);

    if (users.length > 0) {
      res.render('sign/signup', {error: '用户名已被注册', name: name});
      return;
    }

    // 加密
    md5(pass);

    User.newAndSave(name, loginName, pass, function(err) {
      if (err) return next(err);

      res.render('sign/signup', {
        success: '欢迎键入' + config.name
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
  var nickname = sanitize(req.body.name).trim().toLowerCase(),
      pass = sanitize(req.body.pass).trim();

  pass = md5(pass);

  if (!nickname || !pass) {
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