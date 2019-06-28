const express = require('express');
const axios = require('axios');
const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryInfo.js');
const chatMatch = require('../models/chatModel.js')

// Create all our routes and set up logic within those routes where required.
router.get('/profile', function(req, res) {
  matching.match(function(data) {
    const hbsObject = {
      profile: data
    };
    console.log(hbsObject);
    res.render('profile', hbsObject);


  });
});

router.put('/profile/:id', function(req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;
  const matchid = req.body.profilematchid
  console.log(matchid)
  console.log(user_id1)
  let approved = true;

  let latitude = '';
  let longitude = '';
  let bingURL = '';
  let gym_latitude = '';
  let gym_longitude = '';

  chatMatch.findzip([user_id1], (result) => {
    const hbsObject = {
      profile: result
    };

    console.log(result)
    latitude = result[0].hlatitude
    longitude = result[0].hlongitude
    let homeState = result[0].home_state
    let homeCity = result[0].home_city
    let homeZip = result[0].home_zip
    let homeStreet = result[0].home_street
    let gymStreet = result[0].gym_street
    let gymCity = result[0].gym_city
    let gymZip = result[0].gym_zip
    let gymState = result[0].gym_state
    gym_latitude = result[0].glatitude
    gym_longitude = result[0].glongitude



    let bingapiKey = process.env.BING_API_KEY
    let bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${homeState}/${homeZip}/${homeCity}/${homeStreet}?key=${bingapiKey}`
    // console.log(bingURL)
    if (!(latitude) && (!(longitude))) {
      console.log("Fixing User Lat n Long")

      axios.get(bingURL)
        .then(function(response) {

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
      }

      bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${gymState}/${gymZip}/${gymCity}/${gymStreet}?key=${bingapiKey}`
       console.log(bingURL)
      if (!(gym_latitude) && (!(gym_longitude))) {
        console.log("Fixing Gym Lat n Long...")

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

            }

              res.render('profile', hbsObject);
     // res.json(result)
  }).catch(error => {
    console.log(error)
  })


  matching.updateMatch(approved, user_id1, matchid, function() {

    // res.json({ id: res.insertId});
    res.send(true)
    console.log("update happened");
  })
});

router.put('/profile/:id', function(req, res) {
  console.log(req.params.id);
  console.log(req.body.latitude)
  const {
    id
  } = req.params;
  const {
    latitude,
    longitude
  } = req.body;
  const queryValues = [latitude, longitude, id];
  matching.latNlong(queryValues, function() {

    res.json({ id: res.insertId});
    res.send(true)
    console.log("update happened");
  })
});

router.put('/profile/:id', function(req, res) {
  console.log(req.params.id);
  console.log(req.body.latitude)
  const {
    id
  } = req.params;
  const {
    gym_latitude,
    gym_longitude
  } = req.body;
  const queryValues = [gym_latitude, gym_longitude, id];
  matching.gymLatnLong(queryValues, function() {

    // res.json({ id: res.insertId});
    res.send(true)
    console.log("Gym LAT n Long update happened");
  })
});

router.put('/profile/block/:id', function(req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;
  const matchid = req.body.profilematchid
  // console.log(matchid)
  // console.log(user_id1)
  let block = true;

  matching.updateBlock(block, user_id1, matchid, function() {
    console.log(block, matchid, user_id1)

    // res.json({ id: res.insertId});
    res.send(false)
    console.log("BLOCKED USER MATCH");
    // all working
  })
});

router.put('/profile/match/:id', function(req, res) {

  const user_id1 = req.params.id;
  matching.findzip([user_id1], function(result1) {
    const zip = result1[0].home_zip;
    // console.log(result1);
    // console.log(zip);
    matching.zipmatch([zip], [result1[0].id], function(result2) {
      const hbsObject = {
        profile: result2
      };
      // console.log(hbsObject);
      // res.render('profile', hbsObject);
      // console.log(result2.length);
      for (let x = 0; x < result2.length; x++) {
        // console.log(result2[0].id);
        // console.log(result2[1].id);
        // console.log(user_id1);

        matching.existMatch(user_id1, `${result2[x].id}`, "home", function(result, err) {
          // console.log(result);
          // console.log(err);
          if (result.length <= 0) {
            matching.createMatch([user_id1, `${result2[x].id}`, "false", "home", "false"], function() {
              console.log("Create match shows data!!")
            }); //creatematch

          } else {
            console.log("Already exists!!")
          }

        })

      } //forloop

    }) //zipmatch
  }) //findzip
}); //put




router.get('/profile/:id', function (req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;


  // res.render('profile', userObj)
  console.log(`Show the matching of the user ${user_id1}`);

  matching.matchLimit(user_id1, "home", function (result) {
      const hbsObject = {
        matchLimit: result
      };

      console.log(result)
      // console.log(hbsObject);
        res.render('profile', hbsObject);

      // console.log(result.length);
      // console.log(result)

  })

          // console.log(result.length);


})

// End of matching.findzip results

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {

  res.render('index');
});

router.get('/register', function(req, res) {

  res.render('register', {
    title: "signup"
  });
});

router.get('/matches', function(req, res) {

  chatMatch.showOnlineUsers(function(data) {
    const hbsObject = {
      profile: data
    };
    res.render('matches', hbsObject);
  });
});
router.get('/profile', function(req, res) {

  chatMatch.showOnlineUsers(function(data) {
    //console.log(data)
    res.json(data);

  });
});
// router.get('/api/profile/:id', function(req, res){
//   const id = req.params.id;
//   const currentUserLat = '';
//   const currentuserLong ='';
//   const matchedUserLat = '';
//   const matchedUserLong = '';
//
//   matching.findzip([id], (result)=> {
//     console.log(result)
//   })
// })

// router.get('/Latprofile/:id', function(req, res){
//   const id = req.params.id;
//   console.log(id)
//
//   let latitude = '';
//   let longitude = '';
//   let bingURL = '';
//   let gym_latitude = '';
//   let gym_longitude = '';
//
//   matching.findzip([id], (result) => {
//
//
//     // console.log(result)
//     latitude = result[0].hlatitude
//     longitude = result[0].hlongitude
//     let homeState = result[0].home_state
//     let homeCity = result[0].home_city
//     let homeZip = result[0].home_zip
//     let homeStreet = result[0].home_street
//     let gymStreet = result[0].gym_street
//     let gymCity = result[0].gym_city
//     let gymZip = result[0].gym_zip
//     let gymState = result[0].gym_state
//     gym_latitude = result[0].glatitude
//     gym_longitude = result[0].glongitude
//
//     const hbsObject = {
//       profile: result
//     };
//
//     let bingapiKey = process.env.BING_API_KEY
//     let bingURL = `http://dev.virtualearth.net/REST/v1/Locations/US/${homeState}/${homeZip}/${homeCity}/${homeStreet}?key=${bingapiKey}`
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
//
//           matching.latNlong([latitude, longitude, id], (result) => {
//
//             console.log(`Updated User: ${id} LAT n Long`);
//           })
//           .catch(error => {
//             console.log(error)
//           });
//         })
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
//             matching.gymLatnLong([gym_latitude, gym_longitude, id], (gymResponse) => {
//               console.log('Updated Gym Location')
//             })
//           })
//           .catch(error => {
//             console.log(error)
//           })
//             }
//
//               res.render('profile', hbsObject);
//      // res.json(result)
//   })
// })
// POST method route*************************
router.post('/loggedIn', function(req, res) {
  res.send('POST request to the homepage') //Must enter function here ********************

  res.render("register"); // Enter the path that user will be redirected to******************
})

module.exports = router;
