const orm = require('../config/orm.js');

  const emailVer = {
    createUser: function(vals, cb){
        orm.createUser('usercreds', vals, function(res){
            cb(res);
        });
    },
    eProfile: function(vals,cb){
        orm.eVerVal('profile', vals, function(res){
            cb(res)
        })
    },
    eVerUpdate: function(vals,cb){
        orm.eVerUpdate('usercreds',vals, function(res){
            cb(res)
        })
    },
    createProfile: function(vals, cb){
        orm.createProfile('profile', )
    }
  };

module.exports = emailVer;