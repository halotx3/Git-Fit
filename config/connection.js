require('dotenv').config();
const mysql = require('mysql');


//Stores the DB connection Parameters
let connection = mysql.createConnection({
<<<<<<< HEAD
    
    // RDS_HOST = 'gitfit-db.c5jajtp8jxmj.us-east-2.rds.amazonaws.com'
    // RDS_PORT = '3306'
    // RDS_USER = 'root'
    // RDS_PASS = 'starroot'
    // RDS_DB = 'gitfit_db'

    host: 'gitfit-db.c5jajtp8jxmj.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'root',
    password: 'starroot',
    database: 'gitfit_db'
=======


    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASS,
    database: process.env.RDS_DB   
>>>>>>> e49451fb9ea5e9521b4302a52bdfd501b098316c
  
    
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


 
