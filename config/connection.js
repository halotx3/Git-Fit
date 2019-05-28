require('dotenv').config();
const mysql = require('mysql');


//Stores the DB connection Parameters
let connection = mysql.createConnection({
    
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


 
