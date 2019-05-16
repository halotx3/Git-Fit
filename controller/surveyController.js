const router = express.Router();
//Importing the surveyOrm. model which has the specific ORM code
const emailVer = require('../models/surveyorm.js');

router.post('/create', function(req, res){
    
    survyPrf.createsurvey([req.body.firstname, req.body.lastname, req.body.gendermale, req.body.genderfemale, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homestate, req.body.homezip,  req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.primaryexcer, req.body.secondaryexer, req.body.primarylevel, req.body.secondarylevel], function(result){
            //Sending some data back to validate
            res.json({ id: result.insertId });
            onsole.log(result);

    })
});
module.exports = router;
            

