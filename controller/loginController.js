const express = require('express');
const router = express.Router();
const logon = require('../models/logon.js');

// Route for login page on index
router.get('/login1', function(req, res){
    res.render('login1');
});

// Route for index page on index
router.get('/', function(req, res){
    res.render('index');
});

// Route for register page on index
router.get('/register', function(req, res){
    res.render('register');
});




router.post('/api/verify', function(req, res){   
    let password = req.body.password;
    let email = req.body.email;
    
    console.log(password)
    
    logon.pullLogin(req.body.email,function(result){
        console.log(result[0]);
        if (result[0].email == email){
            let id = result[0].id;
            if (result[0].password == password){
                // res.send({
                //     "id": id,
                //     "success":"Match! Now Logging In"
                // });
                if (result[0].active == 1){
                logon.activeLogon(id,function(result){
                    // if (err) throw err
                    res.json(
                        {id: id,}
                    )
                });
            }else{
                console.log('This account has not yet been activated')
            }

            }else{
                // res.send({
                //     "code":204,
                //     "success":"Email and password do not match"
                // })
            }
        }else{
            // res.send({
            //     "code":204,
            //     "success": "Email does not exist!"
            // });
        };
        
    })
});
module.exports = router;