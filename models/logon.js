const orm = require('../config/orm.js');

    const logORM = {
        pullLogin: function(val1,cb){
            orm.pullLogin('usercreds',val1,function(res){
                cb(res)
            })
        },
        activeLogon: function(id,cb){
            orm.activeLoginSession('usercreds',id,function(res){
                cb(res)
            })
        }
    }

    module.exports = logORM;