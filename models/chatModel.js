const orm = require('../config/orm.js');

const chat = {

  showOnlineUsers: function(cb) {
      orm.showOnlineUsers('profile','usercreds', 1 ,function(res) {
        cb(res);
      });
    }
    ,
    latNlong: function( vals, cb){
      orm.latNlong('profile', vals, function(res){
        cb(res);
      });
    },
    gymLatnLong: function( vals, cb){
      orm.gymLatnLong('profile', vals, function(req, res){
        cb(res);
      });
    },
    findzip: function (val, cb) {
      orm.findzip('profile', val, function (res) {
        cb(res);
      });
    },
    showChatUsers: function(id,cb) {
        orm.showChatUsers('profile', id, function(res) {
          cb(res);
        });
      }
};

module.exports = chat;
