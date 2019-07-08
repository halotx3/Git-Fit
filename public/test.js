// Password Validation Test
describe("isValidPassword", function() {
  it("should return true if the password provided is greater than seven characters", function() {
    expect(isValidPassword('georgewashington')).to.equal(true);
  });

  it("should return false if the passwords do not match", function() {
    expect(isValidPassword('bicycle', 'stopwatch')).to.equal(false);
  });
});

// Username Validation Test
describe("isValidemailAddress", function() {
  it("should return true if the username provided is greater than seven characters", function() {
    expect(isValidemailAddress('gwash@test.com')).to.equal(true);
  });

  it("should return false if the username provided is less than 5 characters", function() {
    expect(isValidemailAddress('gwash')).to.equal(false);
  });
});

// Functional Tests
describe('register click', function () {
  const data = [
    { email: 'myemail@test.com', password: 'burgers'},
  ];

  let server;

  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it('displays a success message after post request', function () {

    server.respondWith('POST', '/api/user', [
      200, { 'Content-Type': 'application/json' }, JSON.stringify(data)
    ]);
    
    $('#emailaddress').val('Horacio');
    $('#password1').val('burgers');
    // $('#password2').val('burgers');

    $('#register').trigger('click');

    server.respond();

    expect($('#message').text()).to.equal('you have successfully registered');
  });
});
  