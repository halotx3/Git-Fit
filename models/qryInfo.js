const orm = require('../config/orm.js');

  const match = {
  
    match: function(cb) {
        orm.match('profile', function(res) {
          cb(res);
        });
      }
      // ,

      // appendMatch: function(cb) {
      //   orm.appendMatch('gitfit_match', val, function(res) {
      //     cb(res);
      //   });
      // }
      
  };

module.exports = match;



