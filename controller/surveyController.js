const express = require('express');
const router = express.Router();
const survey = require('../models/surveyorm.js');

//Importing the surveyOrm. model which has the specific ORM code

router.get('/survey', function (req, res){
    res.render('survey', {title: "survey"});
  });

router.post('/survey', function(req, res){
    
    survey.createsurvey([req.body.firstname, req.body.lastname, req.body.gender, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile,req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer, req.body.level, req.body.time_level, req.body.photo], function(result){
            //Sending some data back to validate

            const hbsObject = {
                survey: data

            };
            res.render('survey', hbsObject);
    })
});
module.exports = router;
            

