const orm = require('../config/orm.js');

  const match = {
  
    match: function(cb) {
        orm.match('profile', function(res) {
          cb(res);
        });
      }
      ,

      findzip: function(val, cb) {
        orm.findzip('profile', val, function(res) {
          cb(res);
        });
      },
      zipmatch: function(val1, val2, cb) {
        orm.zipmatch('profile', val1, val2, function(res) {
          cb(res);
        });
      }
      
  };

module.exports = match;



