/**
 *
 * sign
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-05
 * @update 2014-09-05
 */

module.exports = {
  signin: function *() {
    yield this.render('sign/signin');
  },
  signup: function *() {
    yield this.render('sign/signup');
  }
};