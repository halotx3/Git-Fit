const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const dbConfig = require('./config/config.json');
const mysql = require('mysql');
const expect = chai.expect;

// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

// set a variable for making http requests.
let request;

// If the NODE_ENV is set, use that as our current environment
// Otherwise, default to "development" environment
// const environment = process.env.NODE_ENV || "development";

// API tests
describe('GET /api/examples', function () {
  
  // runs before each test
  beforeEach(function (done) {
    request = chai.request(server);

    // values for db INSERT
    // matches order found in the query below, eg [username, password]
    const values = [
      ['Sally', 'test'],
      ['Lane', 'sample']
    ];

    // create db connection and connect
    const conn = mysql.createConnection( dbConfig[environment] )
    conn.connect(function(err) {
      if (err) throw err;

      // delete all records in Users table
      conn.query("DELETE FROM Users", function(err) {
        if (err) throw err;

        // add some content to the now empty db
        conn.query("INSERT INTO Users (username, password) VALUES ?", [values], function(err, data) {
          if (err) throw err;

          // close the db connection and tell mocha that we're done
          conn.end();
          done();
        })
      })
    })
  });

  it('should find all examples', function (done) {

    //hit the GET('/api/users') endpoint
    request.get('/api/users').end(function (err, res) {
      //Save the response
      let responseStatus = res.status;
      let responseBody = res.body;

      //Write test expectations
      expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an('array')
        .that.has.lengthOf(2);

      expect(responseBody[0])
        .to.be.an('object')
        .that.includes({ username: 'Sally', password: 'test' });

      // expect(responseBody[1])
      //   .to.be.an('object')
      //   .that.includes({ username: 'Lane', password: 'sample' });
      done();
    });
  });
});
