const express = require('express');
const router = express.Router();
const logon = require('../models/logon.js');

router.get('/api/verify', function(req, res){   
    logon.pullLogin(req.body.email,req.body.password,function(result){
        console.log(result);

    })
});
module.exports = router;