const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const expect = chai.expect;

// API Endpoint Testing
// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

// set a variable for making http requests.
let request;

describe('POST /api/verify', function() {

  beforeEach(function(done) {
    request = chai.request(server);
    done();
  });

  it('should append an email address and password to usercreds table', function(done) {
    const reqBody = {
      email: 'tjenk_gt@outlook.com',
      password: 'zx7ninja',
      active: true
    };

    // POST the request body to the server
    request
      .post('/api/verify')
      .send(reqBody)
      .end(function(err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;
        // expect(err).to.not.be.null

        expect(responseStatus).to.equal(200);
        
        expect(responseBody)
          .to.be.an('object')
          .that.includes({ affectedRows: 1 });

        // The `done` function is used to end any asynchronous tests
      });
      done();
  });

  it('should not add to the table as email is NULL', function(done) {
    const reqBody = {
      email: "",
      password: 'GE1892',
      active: false
    };

    // POST the request body to the server
    request
      .post('/api/verify')
      .send(reqBody)
      .end(function(err, res) {
        const responseStatus = res.status;
        
        expect(responseStatus).to.not.equal(200);

        // The `done` function is used to end any asynchronous tests
      });
      done();
  });

});