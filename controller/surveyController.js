const express = require('express');
const router = express.Router();
const survey = require('../models/surveyroute.js');
const cookieParser = require('cookie-parser')


const chatMatch = require('../models/chatModel.js')
const axios = require('axios')
//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey/:id', function (req, res){
  let statusChange = 0
    survey.surveyToggle(statusChange,req.params.id, function(req,res){console.log(res)});
    res.render('survey', {title: "survey"});

});

// Posting Survey(Profile) info to db
router.post('/survey/:id', function(req, res){
    console.log(req.params.id);
    const cred_id1 = req.params.id;

    survey.createsurvey(['first_name', 'last_name','home_street', 'home_city', 'home_state', 'home_zip', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','primary_training_type', 'secondary_training_type', 'level', 'levelS','photo', 'cred_id'], [req.body.firstname, req.body.lastname, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile, req.body.gymname, req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer, req.body.primarylevel, req.body.secondarylevel, req.body.photo, cred_id1], function(data){
            //Sending some data back to validate
            // const hbsObject = {
            //     survey: data
            // };
            // res.render('survey', hbsObject);

            
            let bingapiKey = process.env.BING_API_KEY
            let bingURL = ""
            console.log(bingURL)
            bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${req.body.homestate}/${req.body.homezip}/${req.body.homecity}/${req.body.homestreet}?key=${bingapiKey}`
            console.log(bingURL)
            axios.get(bingURL).then(function(response) {

              latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
              longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
              console.log(`user Lat: ${latitude}`);
              console.log(`User Long: ${longitude}`);

              chatMatch.latNlong([latitude, longitude, cred_id1], (homeResponse) => {

                console.log(`Updated User: ${cred_id1} LAT n Long`);
              })

            }).catch(error => {
              console.log(error)
            });
            bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${req.body.gym_state}/${req.body.gym_zip}/${req.body.gym_city}/${req.body.gym_street}?key=${bingapiKey}`
            axios.get(bingURL)
            .then(function(response) {

              gym_latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
              gym_longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
              console.log(`GYM Long: ${gym_longitude}`)
              console.log(`GYM LAT: ${gym_latitude}`)
              
              chatMatch.gymLatnLong([gym_latitude, gym_longitude, cred_id1], (gymResponse) => {
                console.log('Updated Gym Location')
              })
            res.json({data: cred_id1});
    })

  })

  });


module.exports = router;
