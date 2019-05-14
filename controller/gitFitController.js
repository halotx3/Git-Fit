const express = require('express');

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const matching = require('../models/qryinfo.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
    matching.match(function(data) {
    const hbsObject = {
      profile: data
    };
    console.log(hbsObject);

    // if (err) {
    //     return res.status(500).end();
    //   }
    // console.log(data);
    res.render('index', hbsObject);
    // res.render('index', { burger: data });
    
  });
});

// router.get('/api/match/:id', function(req, res) {
//   console.log(req.param.id)
//   const user_id1 = {id: req.params.id}

//   matching.appendMatch([[user_id1], function(result) {
//     // Send back the ID of the new quote
//     // res.json({ id: result.insertId });
//     res.render('index', user_id1);
//   });

//   // if (err) {
//   //     return res.status(500).end();
//   //   }
//   // console.log(data);
//   // res.render('index', hbsObject);
//   // res.render('index', { burger: data });
  
// });
// });

module.exports = router;