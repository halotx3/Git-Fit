const orm = require('../config/orm.js');

  const emailVer = {
    createUser: function(vals, cb){
        orm.createUser('account_info', vals, function(res){
            cb(res);
        });
    },
    eVerVal: function(cb){
        orm.eVerVal('account_info', vals, function(res){
            cb(res)
        })
    },
    eVerUpdate: function(val,cb){
        orm.eVerUpdate('account_info',val, function(res){
            cb(res)
        })
    }
  };

module.exports = emailVer;
