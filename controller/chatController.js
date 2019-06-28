const express = require('express');
const axios = require('axios')
const router = express.Router();
const latNlong = require('../controller/chatController.js')


// Import the model (cat.js) to use its database functions.
// const matching = require('../models/qryinfo.js');
const chatMatch = require('../models/chatModel.js')



// router.get('/chat', function(req, res) {
//
//   chatMatch.showOnlineUsers(function(data){
//     const hbsObject = {
//         profile: data
//       };
//
//   res.render('chat', hbsObject);
//   })
// })

router.get('/api/profile', function(req, res){

//   res.send({"hello":"world"})
// //   // const id = req.params.id;
// //   const id = 12;
// //
// //   console.log(req.params)
// //
//   let latitude = '';
//   let longitude = '';
//   let bingURL = '';
//   let gym_latitude = '';
//   let gym_longitude = '';
//
//
//
//
//   // chatMatch.findzip([id], (result) => {
//
//
//
//     // console.log(result)
//     // latitude = result[0].hlatitude
//     // longitude = result[0].hlongitude
//     let homeState = req.query.data.homestreet
//     let homeCity = req.query.data.homecity
//     let homeZip = req.query.data.homezip
//     let homeStreet =  req.query.data.homestreet
//     let gymStreet = req.query.data.gymstreet
//     let gymCity = req.query.data.gymcity
//     let gymZip = req.query.data.gymzip
//     let gymState = req.query.data.gymstate
//     // gym_latitude = result[0].glatitude
//     // gym_longitude = result[0].glongitude
//
//     // const hbsObject = {
//     //   profile: result
//     // };
//  console.log(`adflkahfajhadjkhakj!!!${homeState}`)
//     let bingapiKey = process.env.BING_API_KEY
//     bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${homeState}/${homeZip}/${homeCity}/${homeStreet}?key=${bingapiKey}`
//     // console.log(bingURL)
//     if (!(latitude) && (!(longitude))) {
//       console.log("Fixing User Lat n Long")
//
//       axios.get(bingURL)
//         .then(function(response) {
//
//           latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
//           longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
//           console.log(`user Lat: ${latitude}`);
//           console.log(`User Long: ${longitude}`);
//           latNlong.latitude = latitude
//           latNlong.longitude = longitude
//
//
//         }).catch(error => {
//           console.log(error)
//         });
//       }
//
//       bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${gymState}/${gymZip}/${gymCity}/${gymStreet}?key=${bingapiKey}`
//        // console.log(bingURL)
//       if (!(gym_latitude) && (!(gym_longitude))) {
//         console.log("Fixing Gym Lat n Long...")
//
//         axios.get(bingURL)
//           .then(function(response) {
//
//             gym_latitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]
//             gym_longitude = response.data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1]
//             console.log(`GYM Long: ${gym_longitude}`)
//             console.log(`GYM LAT: ${gym_latitude}`)
//             latNlong.gym_latitude = gym_latitude
//             latNlong.gym_longitude = gym_longitude
//
//               console.log('Updated Gym Location')
//
//               // console.log(latNlong.latitude)
//               // console.log(latNlong.gym_latitude)
//
//           }).catch(error => {
//             console.log(error)
//           })
//
//             // res.send(response)
//             }


               // res.render('profile', hbsObject);
               // console.log(response);
    // res.send(result)

})

module.exports = router;
