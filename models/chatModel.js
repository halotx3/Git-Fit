const orm = require('../config/orm.js');

const chat = {

  showOnlineUsers: function(cb) {
      orm.showOnlineUsers('profile','usercreds', 1 ,function(res) {
        cb(res);
      });
    }

};

module.exports = chat;
// ('../config/orm.js');
