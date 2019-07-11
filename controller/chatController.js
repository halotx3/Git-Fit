const express = require('express');
const axios = require('axios')
const router = express.Router();
const latNlong = require('../controller/chatController.js')


// Import the model (cat.js) to use its database functions.
// const matching = require('../models/qryinfo.js');
const chatMatch = require('../models/chatModel.js')



router.post('/profile/:id', function(req, res) {
  const id = req.params.id

  chatMatch.showChatUsers(id, function(data){


  res.json(data);
  })
})



module.exports = router;
