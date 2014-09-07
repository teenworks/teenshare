/**
 *
 * sign
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-05
 * @update 2014-09-05
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

  signin: function *() {

    yield this.render('sign/signin');

  },

  signup: function *() {

    yield this.render('sign/signup');

  },

  doSignin: function *() {

    var params = this.request.body;

    var user = yield User.findOne({ name: params.name }).exec();

    try {
      if (user.password === params.password) {
        this.redirect('/');
      }
    } catch (e) {
      console.error(e);
    }

  },

  doSignup: function *() {

    var params = this.request.body;
    var user = new User(params);

    yield user.add();

    this.body = {
      success: true,
      name: user.name
    };

    this.redirect('/');
  }

};