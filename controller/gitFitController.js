const express = require('express');
const geodist = require('geodist')
const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryInfo.js');
const chatMatch = require('../models/chatModel.js')



router.put('/profile/distance/:id', function(req, res) {
  const user_id = req.params.id // IDEA:
  console.log(`THIS IS MY ROUTE ${user_id}`)

  matching.findzip([user_id], function(result1) {
    // grab current user lat and long
    const current_latitude = result1[0].hlatitude
    const current_longitude = result1[0].hlongitude
    // console.log(current_latitude)
    // console.log(current_longitude)

    matching.matchLimit(user_id, "home", function(result) {

      for (let i = 0; i < result.length; i++) {
        const match_id = result[i].match_id
        console.log(`Here are all my matchesZZZZZZ:${match_id}`)

        const matched_User_1_lat = result[i].hlatitude
        const matched_User_1_long = result[i].hlongitude
        const matched_User_2_latitude = result[i].hlatitude
        const matched_User_2_long = result[i].hlongitude
        // console.log(matched_User_1_lat)
        // console.log(matched_User_1_long)
        // console.log(matched_User_2_latitude)
        // console.log(matched_User_2_long)

        const distance_match_1 = geodist({
          latitude: current_latitude,
          longitude: current_longitude
        }, {
          latitude: matched_User_1_lat,
          longitude: matched_User_1_long
        });

        // const distance_match_2 = geodist({
        //   latitude: current_latitude,
        //   longitude: current_longitude
        // }, {
        //   latitude: matched_User_2_latitude,
        //   longitude: matched_User_2_long
        // });
        const distance = distance_match_1 / 1000

        matching.updateDistance(distance, user_id, match_id, function(result, err){
          console.log("Added Distance!!!")
        })

      }
      const hbsObject = {
        matchLimit: result
      };

      // console.log(result)
      // console.log(hbsObject);
      res.render('profile', hbsObject);

    })

  })
})
// Approving a match
router.put('/profile/:id', function(req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;
  const matchid = req.body.profilematchid
  console.log(user_id1)

  let approved = true;

  matching.updateMatch(approved, user_id1, matchid, function() {

    // res.json({ id: res.insertId});
    res.send(true)
    console.log("update happened");
  })
});

// Blocking the match
router.put('/profile/block/:id', function(req, res) {
  // console.log(req.params.id);
  const user_id1 = req.params.id;
  // const matchid = req.body.profilematchid
  // console.log(matchid)

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
  // console.log(req);
  const user_id1 = req.params.id;
  // const matchid = req.body.profilematchid
  matching.findzip([user_id1], function(result1) {
    const zip = result1[0].home_zip;
    const current_latitude = result1[0].hlatitude
    const current_longitude = result1[0].hlongitude

    // console.log(current_latitude)
    // console.log(current_longitude)
    // console.log(result1);
    // console.log(zip);

    matching.zipmatch([zip], [result1[0].cred_id], function(result2) {

      const hbsObject = {
        profile: result2
      };



      // console.log(distance_match_2)
      // console.log(hbsObject);
      // res.render('profile', hbsObject);
      // console.log(result2.length);
      for (let x = 0; x < result2.length; x++) {

        // const distance2 = distance_match_2 / 1000
        // console.log(distance)

        // console.log(result2[0].id);
        // console.log(result2[1].id);
        // console.log(user_id1);

        matching.existMatch(user_id1, `${result2[x].cred_id}`, "home", function(result, err) {
          // console.log(result2[x].cred_id);
          // console.log(err);
          if (result.length <= 0) {
            matching.createMatch([user_id1, `${result2[x].cred_id}`, "false", "home", "false", distance], function() {
              console.log(distance)
              console.log("Create match shows data!!")
            }); //creatematch

          } else {
            console.log("Already exists!!")
          }

        })


        //forloop

      } //zipmatch
    }) //findzip
  }); //put
})


// display the match on the page
router.get('/profile/:id', function(req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;


  // res.render('profile', userObj)
  console.log(`Show the matching of the user ${user_id1}`);

  matching.matchLimit(user_id1, "home", function(result) {
    const hbsObject = {
      matchLimit: result
    };

    // console.log(result)
    // console.log(hbsObject);
    res.render('profile', hbsObject);

    // console.log(result.length);
    // console.log(result)

  })



}) //End of matching.findzip results

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
    console.log(data)


  });
});


// POST method route*************************
router.post('/loggedIn', function(req, res) {
  res.send('POST request to the homepage') //Must enter function here ********************

  res.render("register"); // Enter the path that user will be redirected to******************
})

module.exports = router;
