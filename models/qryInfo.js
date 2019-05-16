const orm = require('../config/orm.js');

const match = {

  match: function (cb) {
    orm.match('profile', function (res) {
      cb(res);
    });
  }
  ,
  findzip: function (val, cb) {
    orm.findzip('profile', val, function (res) {
      cb(res);
    });
  }
  ,
  zipmatch: function (val1, val2, cb) {
    orm.zipmatch('profile', val1, val2, function (res) {
      cb(res);
    });
  }
  ,
  createMatch: function (vals, cb) {
    orm.createMatch('gitfit_match', vals, function (res) {
      console.log("********createMatch******");
      console.log(vals);
      cb(res);
    });
  }
  ,
  existMatch: function (userid, matchid, type, cb) {
    orm.existMatch('gitfit_match', userid, matchid, type, function (res) {
      cb(res);
    });
  }
  ,
  updateMatch: function (approved, userid, matchid, cb) {
    orm.updateMatch('gitfit_match', approved, userid, matchid, function (res) {
      console.log(approved, userid, matchid);
      cb(res);
    });
    }
    ,
    updateBlock: function (block, userid, matchid, cb) {
      orm.updateBlock('gitfit_match', block, userid, matchid, function (res) {
        console.log(block, userid, matchid);
        cb(res);
      });
    }
}
  
  module.exports = match;



