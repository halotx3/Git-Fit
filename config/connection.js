require('dotenv').config();
const mysql = require('mysql');


//Stores the DB connection Parameters
let connection = mysql.createConnection({

    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'MySQL2019!!',
    database: 'gitfit_db'

    // host: process.env.RDS_HOST,
    // port: process.env.RDS_PORT,
    // user: process.env.RDS_USER,
    // password: process.env.RDS_PASS,
    // database: process.env.RDS_DB
  
})


//Connects to the Database
connection.connect(function(err) {
    if (err) {
      // console.log(process.env.RDS_DB);
      console.error('error connecting: ' + err.stack);
      // console.log(process.env.RDS_DB);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

// Exports connection for ORM/Serverjs usage
  module.exports = connection;


 