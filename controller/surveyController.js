const express = require('express');
const router = express.Router();
const survey = require('../models/surveyroute.js');
const cookieParser = require('cookie-parser')


//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey/:id', function (req, res){
    
    res.render('survey', {title: "survey"});
});

// Posting Survey(Profile) info to db
router.post('/survey/:id', function(req, res){
    console.log(req.params.id);
    const cred_id1 = req.params.id;

    survey.createsurvey(['first_name', 'last_name', 'gender', 'home_street', 'home_city', 'home_state', 'home_zip', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','primary_training_type', 'secondary_training_type', 'level', 'levelS','photo', 'cred_id'], [req.body.firstname, req.body.lastname, req.body.gender, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile, req.body.gymname, req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer, req.body.primarylevel, req.body.secondarylevel, req.body.photo, cred_id1], function(data){
            //Sending some data back to validate
            // const hbsObject = {
            //     survey: data
            // };
            // res.render('survey', hbsObject);
            res.send(data);
    })
});

module.exports = router;          