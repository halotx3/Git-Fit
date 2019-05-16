const express = require('express');

const router = express.Router();

// Import the model (cat.js) to use its database functions.
// const matching = require('../models/qryinfo.js');
const chatMatch = require('../models/chatModel.js')



router.get('/chat', function(req, res) {

  chatMatch.showOnlineUsers(function(data){
    const hbsObject = {
        profile: data
      };

  res.render('chat', hbsObject);
  })
});

module.exports = router;
