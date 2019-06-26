const express = require('express');
const session = require('express-session');
const router = express.Router();
const logon = require('../models/logon.js');
const bcrypt = require('bcrypt');
const passport = require(('passport'))


router.post('/api/verify', function(req, res){   
    let password = req.body.password;
    let email = req.body.email;
    
    console.log(password)
    
    logon.pullLogin(req.body.email,function(result){
        console.log(result[0]);
        if (result[0].email == email){
            let id = result[0].id;
            bcrypt.compare(req.body.password,result[0].password, function(err,res){
                if(res) {
                    console.log('Log in attempt successful')
                    req.session.id = id

                }else {
                    //password does not match
              
                }
            })
        }
        
    })
});
module.exports = router;