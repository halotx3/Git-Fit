const orm = require('../config/orm.js');

  const survey = {
    createsurvey: function(cols, vals, cb){
        orm.createsurvey('profile', cols, vals, function(res) {
            cb(res);
        });
    },
    getsurvey: function(cb){
      orm.getsurvey('profile',function(res){
        cb(res)
      });
    }
  }
    module.exports = survey;