const express = require('express');

const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
          
      res.render('index');
    });

    router.get('/register', function(req, res) {
          
      res.render('register', {title: "signup"});
    });
    
    router.get('/matches', function(req, res) {
          
      res.render('matches', {title: "Matches"});
    });
    

    // POST method route*************************
  router.post('/loggedIn', function (req, res) {
  res.send('POST request to the homepage') //Must enter function here ********************

res.render("register");// Enter the path that user will be redirected to******************
})

module.exports = router;