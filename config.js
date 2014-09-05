/**
 *
 * config
 *
 * @description configuration file for TeenShare
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-03
 * @update 2014-09-03
 */

var config = {
  name: 'TeenShare',
  description: 'Sharing platform for TeenWorks.',
  db: 'mongodb://127.0.0.1/teenshare',
  db_name: 'teenshare',
  port: 3000,
  bodyparser: {},
  session: {
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  }
};

module.exports = config;
module.exports.config = config;