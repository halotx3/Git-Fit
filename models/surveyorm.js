const orm = require('../config/orm.js');

  const survey = {
    createsurvey: function(vals, cb){
        orm.createsurvey('profile', vals, function(res) {
            cb(res);
        });
    }
  }
    module.exports = survey;