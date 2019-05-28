const express = require('express');

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryInfo.js');
const chatMatch = require('../models/chatModel.js')

// Create all our routes and set up logic within those routes where required.
router.get('/profile', function (req, res) {
  matching.match(function (data) {
    const hbsObject = {
      profile: data
    };
    console.log(hbsObject);

    // if (err) {
    //     return res.status(500).end();
    //   }
    // console.log(data);
    res.render('profile', hbsObject);
    // res.render('index', { burger: data });

  });
});

router.put('/profile/:id', function (req, res) {
//   console.log(req.params.id);
//   const user_id1 = req.params.id;
//   const matchid = req.body.profilematchid
//   console.log(matchid)
//   console.log(user_id1)
//   let approved = true;

//   matching.updateMatch(approved, user_id1, matchid, function () {

//     // res.json({ id: res.insertId});
//     res.send(true)
//     console.log("update happened");
//   })
// });

// router.put('/profile/block/:id', function (req, res) {
//   console.log(req.params.id);
//   const user_id1 = req.params.id;
//   const matchid = req.body.profilematchid
//   // console.log(matchid)
//   // console.log(user_id1)
//   let block = true;

//   matching.updateBlock(block, user_id1, matchid, function () {
//     console.log(block, matchid, user_id1)

//     // res.json({ id: res.insertId});
//     res.send(false)
//     console.log("BLOCKED USER MATCH");
//   })
// });

// router.put('/profile/match/:id', function (req, res) {
//   // console.log(req.params.id);
//   const user_id1 = req.params.id;
//   matching.findzip([user_id1], function (result1) {
//     const zip = result1[0].homezip; // add _ to homezip
//     // console.log(result);
//     // console.log(zip);
//     matching.zipmatch([zip], [result1[0].id], function (result2) {
//       const hbsObject = {
//         profile: result2
//       };
//       console.log(hbsObject);
//       // res.render('profile', hbsObject);
//       console.log(result2.length);
//       for (let x = 0; x < result2.length; x++) {
//         // console.log(result2[0].id);
//         // console.log(result2[1].id);
//         // console.log(user_id1);

//         matching.existMatch(user_id1, `${result2[x].id}`, "home", function (result, err) {
//           // console.log(result);
//           // console.log(err);
//           if (result.length <= 0 ) {
//             matching.createMatch([user_id1, `${result2[x].id}`, "false", "home", "false"], function () {
//               console.log("Create match shows data!!")
//             }); //creatematch  
            
//           }else{
//             console.log("Already exists!!")  
//           } 

//         })




//       }//forloop

//     }) //zipmatch
//   }) //findzip
}); //put




router.get('/profile/:id', function (req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;

  // const userObj = {
  //   person: user_id1
  // };


  // res.render('profile', userObj)
  // console.log(user_id1);

  matching.findzip([user_id1], function (result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    // res.render('profile', user_id1);

    const zip = result[0].home_zip;
    console.log(result);
    console.log(zip);


    matching.zipmatch([zip], [result[0].id], function (result) {
      const hbsObject = {
        profile: result
      };
      console.log(hbsObject);
      res.render('profile', hbsObject);

      console.log(result.length);


    });


  });

})

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {

  res.render('index');
});

router.get('/register', function (req, res) {

  res.render('register', { title: "signup" });
});

router.get('/matches', function (req, res) {

  chatMatch.showOnlineUsers(function (data) {
    const hbsObject = {
      profile: data
    };
    res.render('matches', hbsObject);
  });
});
router.get('/profile', function (req, res) {

  chatMatch.showOnlineUsers(function (data) {
    console.log(data)
    res.json(data);

  });
});

router.get('/matches/:id', function (req, res) {
  // matching.match(function(data) {
  //   const hbsObject = {
  //     profile: data
  //   };
  //   console.log(hbsObject);

  const user_id1 = req.params.id;
  // console.log(user_id1);

  matching.findzip([user_id1], function (result) {

    const zip = result[0].home_zip;
    console.log(result);
    console.log(zip);

    matching.zipmatch([zip], [result[0].id], function (result) {
      const hbsObject = {
        profile: result
      };
      console.log(hbsObject);
      res.render('matches', hbsObject);


    });



  });

});
// POST method route*************************
router.post('/loggedIn', function (req, res) {
  res.send('POST request to the homepage') //Must enter function here ********************

  res.render("register");// Enter the path that user will be redirected to******************
})

module.exports = router;
