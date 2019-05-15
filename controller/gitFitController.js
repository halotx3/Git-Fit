const express = require('express');

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryinfo.js');

// Create all our routes and set up logic within those routes where required.
router.get('/profile', function(req, res) {
    matching.match(function(data) {
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

router.get('/profile/:id', function(req, res) {
  console.log(req.params.id);
  const user_id1 = req.params.id;
  // console.log(user_id1);

  matching.findzip([user_id1], function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    // res.render('profile', user_id1);
    const zip = result[0].home_zip;
    console.log(result);
    console.log(zip);

    matching.zipmatch([zip],[result[0].id], function(result) {
      const hbsObject = {
        profile: result
      };
      console.log(hbsObject);
      res.render('profile', hbsObject);
  
  
  
      
    });

  })
});

  // if (err) {
  //     return res.status(500).end();
  //   }
  // console.log(data);
  // res.render('index', hbsObject);
  // res.render('index', { burger: data });
// });
// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
          
      res.render('index');
    });

    module.exports = router;
