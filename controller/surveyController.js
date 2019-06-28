const express = require('express');
const router = express.Router();
const survey = require('../models/surveyroute.js');
const axios = require('axios')
//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey', function (req, res){
    console.log ('Testing survey');
    res.render('survey', {title: "survey"});
    console.log ('test post!!')
});






// console.log(latNlong())
router.post('/survey', function(req, res){

    // console.log ('Testing survey a');
    // let bingapiKey = process.env.BING_API_KEY
    // let bingURL = ""
    // bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${req.body.homestate}/${req.body.homezip}/${req.body.homecity}/${req.body.homestreet}?key=${bingapiKey}`
    // axios.get(bingURL)
    //   .then(function(response) {
    // req.body.hlatitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
    // req.body.hlong = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
    // console.log(req.body.hlatitude)
    // }).catch(error => {
    //   console.log(error)
    // })
    // bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${req.body.gym_state}/${req.body.gym_zip}/${req.body.gym_city}/${req.body.gym_street}?key=${bingapiKey}`
    // axios.get(bingURL)
    // .then(function(response) {
    // req.body.gym_latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
    // req.body.gym_longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
    // }).catch(error => {
    //   console.log(error)
    // })

    survey.createsurvey(['first_name', 'last_name', 'gender', 'home_street', 'home_city', 'home_state', 'home_zip', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','primary_training_type', 'secondary_training_type','hlatitude', 'hlongitude', 'glatitude','glongitude'], [req.body.firstname, req.body.lastname, req.body.gender, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile, req.body.gymname, req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer, req.body.hlatitude, req.body.hlong, req.body.gym_latitude, req.body.gym_longitude], function(data){
        console.log ('Testing survey B');
            //Sending some data back to validate

            
            res.send(data);
    })
});

module.exports = router;
