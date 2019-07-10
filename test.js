const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
const expect = chai.expect;

// API Endpoint Testing
// Setting up the chai http plugin. This plugin allows for HTTP integration testing with Chai assertions!
chai.use(chaiHttp);

  // set a variable for making http requests.
let request;

describe('POST /api/users', function() {

  beforeEach(function(done) {
    request = chai.request(server);
    done();
  });

  it('should save an example', function(done) {
    const reqBody = {
      username: 'John Smith',
      password: 'stealthy'
    };

    // POST the request body to the server
    request
      .post('/api/users')
      .send(reqBody)
      .end(function(err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('object')
          .that.includes({ affectedRows: 1 });

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});