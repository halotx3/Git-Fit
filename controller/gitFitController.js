const express = require('express');
const geodist = require('geodist')
const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryInfo.js');
const chatMatch = require('../models/chatModel.js')



// Approving a match
router.put('/profile/:id', function(req, res) {
  // console.log(req.params.id);
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
    // console.log(block, matchid, user_id1)

    // res.json({ id: res.insertId});
    res.send(false)
    console.log("BLOCKED USER MATCH");
    // all working
  })
});

// Finding a match to display on the screen
router.put('/profile/match/:id', function(req, res) {
  // console.log(req);
  const user_id1 = req.params.id;
  // const matchid = req.body.profilematchid
  matching.findzip([user_id1], function(result1) {
    const zip = result1[0].home_zip;

    // console.log(result1);
    // console.log(zip);

    matching.zipmatch([zip], [result1[0].cred_id], function(result2) {

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

        matching.existMatch(user_id1, `${result2[x].cred_id}`, "home", function(result, err) {
          // console.log(result2[x].cred_id);
          // console.log(err);
          if (result.length <= 0) {
            matching.createMatch([user_id1, `${result2[x].cred_id}`, "false", "home", "false"], function() {
              // console.log(distance)
              // console.log("Create match shows data!!")
            }); //creatematch

          } else {
            // console.log("Already exists!!")
          }

        })


        //forloop

      } //zipmatch
    }) //findzip
  }); //put
})


// Getting the destination
router.put('/profile/distance/:id', function(req, res) {
  let user_id = req.params.id // IDEA:
  // const zip = result[0].home_zip;
  matching.findzip([user_id], function(result1) {
    const zip = result1[0].home_zip;
    // grab current user lat and long
    const current_latitude = result1[0].hlatitude
    const current_longitude = result1[0].hlongitude
    matching.zipmatch([zip], [user_id], function(result) {
        for (let i = 0; i < result.length; i++) {
          // console.log(`Matched User:!!!${result[i].id}`)
          const match_id = result[i].cred_id
          // console.log(match_id)
          
          const matched_User_1_lat = result[i].hlatitude
          const matched_User_1_long = result[i].hlongitude
          
          // console.log(matched_User_1_lat)
          // console.log(matched_User_1_long)
        
          const current_distance = {
            lat: current_latitude,
            long: current_longitude
          }
          const matched_User_distance = {
            lat: matched_User_1_lat,
            long: matched_User_1_long
          }
          // shows the distance
          const distance = geodist(current_distance, matched_User_distance,{unit:'miles'})
          // const setDistance = distance / 100
          // console.log(`Matched User Distance:${setDistance}`)
          // console.log(`Current User: ${user_id}`)
          // console.log(`Matched User ID: ${match_id}`)
           matching.updateDistance(distance, user_id, match_id, function(result, err){
            // console.log("Added Distance!!!")
           })
        }
        const hbsObject = {
          matchDistance: result
        };
        // console.log(hbsObject);
        res.render('profile', hbsObject);
      })
    })
}) //End of Destination

// display the match on the page
router.get('/profile/:id', function(req, res) {
  // console.log(req.params.id);
  const user_id1 = req.params.id;

  // res.render('profile', userObj)
  // console.log(`Show the matching of the user ${user_id1}`);

  matching.matchLimit(user_id1, "home", function(result) {
    const hbsObject = {
      matchLimit: result
    };

    // console.log(result)
    // console.log(hbsObject);
    res.render('profile', hbsObject);


  })



}) //End of matching.Limit results route to display the matches

// Show the current user on the page
router.get('/profile/current/:id', function (req, res){
  console.log(req.params.id);
  const user_id3 = req.params.id;
 
  
  matching.findzip([user_id3], function (result3){
    const hbsObject1 = {
      currentUser: result3[0],
      // name:result3[0].first_name
    };
    console.log("***********Current User info************")
    let name = result3[0].first_name
    console.log(`Here is the first name ${name}`)
    console.log(result3)
    console.log("***********testing************")
    console.log(hbsObject1)
    // console.log(hbsObject);
      res.render('profile', hbsObject1);

  });

}) //End of current user profile information

// Redo current user
// router.put('/sidebar/:id', function(req, res){

//   const mainUser = req.params.id;
//   console.log(`This is the second router for side bar ${mainUser}`)
//     matching.findzip(mainUser, function(result){
//       const hbsObject = {
//         mainUser: result
//       };
//       console.log("GET THE MAIN USER");
//       // console.log(hbsObject)
//       res.render('sidebar', hbsObject)      

//     })

// })
// End of current user

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
// router.get('/profile', function (req, res) {

//   chatMatch.showOnlineUsers(function (data) {
//     console.log(data)
//     res.json(data);

//   });
// });


// POST method route*************************
router.post('/loggedIn', function(req, res) {
  res.send('POST request to the homepage') //Must enter function here ********************

  res.render("register"); // Enter the path that user will be redirected to******************
})

module.exports = router;
