const orm = require('../config/orm.js');

  const emailVer = {
    createUser: function(vals, cb){
        orm.createUser('usercreds', vals, function(res){
            cb(res);
        });
    },
    // eVerVal: function(vals,cb){
    //     orm.eVerVal('usercreds', vals, function(res){
    //         cb(res)
    //     })
    // },
    eVerUpdate: function(vals,cb){
        orm.eVerUpdate('usercreds',vals, function(res){
            cb(res)
        })
    }
  };

module.exports = emailVer;