const orm = require('../config/orm.js');

  const emailVer = {
    createUser: function(vals, cb){
        orm.createUser('usercreds', vals, function(res){
            cb(res);
        });
    },
    eVerVal: function(cb){
        orm.eVerVal('usercreds', vals, function(res){
            cb(res)
        })
    },
    eVerUpdate: function(val,cb){
        orm.eVerUpdate('usercreds',val, function(res){
            cb(res)
        })
    }
  };

module.exports = emailVer;
