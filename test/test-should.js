var should = require('chai').should();
var models = require('models');

describe('A function that creates a user', function(){

  // runs before each test
  beforeEach(function (done) {
    request = chai.request(server);
  }

    it('should create the user', function(done){

        var user = {
            username: "TestUser1198",
            password: "geditial1892",
        };

        models.user.create(user, (err, user)=>{
            should.not.exist(err);

            should.exist(user);
            user.should.be.an('object');

            should.exist(user.id);
            user.id.should.be.a('number');
            user.id.should.be.gte(0);

            should.exist(user.username);
            user.string.should.be.a('string');
            user.string.should.equal('TestUser1198');

            should.exist(user.password);
            user.password.should.be.a('string');
            user.password.should.not.equal('geditial1892');
            user.password.length.should.be.gt(10);

            done();
        });
    
    }
}