// Password Validation Test
describe("isValidPassword", function() {
  it("should return true if the password provided is greater than seven characters", function() {
    expect(isValidPassword('cocopuff')).to.equal(true);
  });

  it("should return false if the password provided is less than seven characters", function() {
    expect(isValidPassword('coco')).to.equal(false);
  });  
});

// Username Validation Test
describe("isValidemailAddress", function() {
  it("should return true if the email address is greater than 12 characters", function() {
    expect(isValidemailAddress('emailtest@email.com')).to.equal(true);
  });

  it("should return false if the email address provided is less than 10 characters", function() {
    expect(isValidemailAddress('gpayton')).to.equal(false);
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
    
    $('#emailaddress').val('myemail@test.com');
    $('#password').val('burgerss');
    
    $('#register').trigger('click');

    server.respond();

    expect($('#message').text()).to.equal('you have successfully registered');
  });
});
  