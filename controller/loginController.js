const express = require('express');
const session = require('express-session');
const router = express.Router();
const logon = require('../models/logon.js');
const bcrypt = require('bcrypt');
const passport = require(('passport'))
const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session');

// Route for login page 
router.get('/login', function(req, res){
    res.render('login1');
});


router.post('/api/verify', function(req, res){
    let password = req.body.password;
    let email = req.body.email;
    let mRes = res;
    console.log(password)
    if (email) {
    logon.pullLogin(req.body.email,function(result){
        console.log(result[0]);
        if (result[0].email == email){
            let id = result[0].id;
            let first = result[0].first
            bcrypt.compare(req.body.password,result[0].password, function(err, result){
                if(result) {
                    console.log('Log in attempt successful')
                    res.json({profile: id,status: first})
                }else {
                    //password does not match
                    console.log('Incorrect Username/Password!')
                    res.status(403);
                }
            })
        }
        
    });
    } else {
        res.status(403);
    }
});

//Logout functionality
router.get('/signout',function(req,res){
    
    res.send('User has been signed out.');
})
module.exports = router;
