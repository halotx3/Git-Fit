const express = require('express');
const router = express.Router();
const survey = require('../models/surveyroute.js');
const chatMatch = require('../models/chatModel.js')
const axios = require('axios')
//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey', function (req, res){

    res.render('survey', {title: "survey"});

});

// Posting Survey(Profile) info to db
router.post('/api/survey', function(req, res){

  console.log ('Testing survey a');


  survey.createsurvey(['first_name', 'last_name', 'gender', 'home_street', 'home_city', 'home_state', 'home_zip', 'hlatitude','hlongitude', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','glatitude', 'glongitude','primary_training_type', 'secondary_training_type', 'level', 'levelS','photo'], [req.body.data.firstname, req.body.data.lastname, req.body.data.gender, req.body.data.homestreet, req.body.data.homecity, req.body.data.homestate, req.body.data.homezip, req.bod.latitude,longitude, req.body.data.mobile, req.body.data.gymname, req.body.data.gymstreet, req.body.data.gymcity, req.body.data.gymstate, req.body.data.gymzip, gym_latitude, gym_longitude, req.body.data.primaryexcer, req.body.data.secondaryexer, req.body.data.primarylevel, req.body.data.secondarylevel, req.body.data.photo], function(data){


    let bingapiKey = process.env.BING_API_KEY
    let bingURL = ""
    bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${req.body.homestate}/${req.body.homezip}/${req.body.homecity}/${req.body.homestreet}?key=${bingapiKey}`
    axios.get(bingURL).then(function(response) {

      latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
      longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
      console.log(`user Lat: ${latitude}`);
      console.log(`User Long: ${longitude}`);

      chatMatch.latNlong([latitude, longitude, user_id1], (homeResponse) => {

        console.log(`Updated User: ${id} LAT n Long`);
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
      chatMatch.gymLatnLong([gym_latitude, gym_longitude, user_id1], (gymResponse) => {
        console.log('Updated Gym Location')
      })
    })

  })

    res.send(data);
  }); 


module.exports = router;
