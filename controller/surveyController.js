const express = require('express');
const router = express.Router();
const survey = require('../models/surveyroute.js');

//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey', function (req, res){
    
    res.render('survey', {title: "survey"});
    
});

// Posting Survey(Profile) info to db
router.post('/survey', function(req, res){
    survey.createsurvey(['first_name', 'last_name', 'gender', 'home_street', 'home_city', 'home_state', 'home_zip', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','primary_training_type', 'secondary_training_type', 'level', 'levelS'], [req.body.firstname, req.body.lastname, req.body.gender, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile, req.body.gymname, req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer, req.body.primarylevel, req.body.secondarylevel], function(data){
            //Sending some data back to validate
            const hbsObject = {
                survey: data
            };
            res.render('survey', hbsObject);
    })
});

module.exports = router;          