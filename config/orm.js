// Import MySQL connection.
const connection = require('../config/connection.js');

// * This function will be called with the data inserted by user.
// * */

Burger.insertOne = function insertOne(newBurger, result){
    //Insert query
    connection.query("INSERT INTO `burgers` set ?", newBurger, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};


// Export the orm object for the model (cat.js).
module.exports = orm;
