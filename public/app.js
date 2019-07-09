const isValidPassword = function (password) {
    return password.length >= 8;
  }
  
const isValidemailAddress = function (useremail) {
    return useremail.length >= 12;
  }
  
const register = function () {
const password = $('#password').val().trim();
const useremail = $('#emailaddress').val().trim();
  
if (isValidPassword(password) && isValidemailAddress(useremail)) {
  const data = {
    useremail: useremail,
    password: password
  }
  
  $.post('/api/user', data, function () {
      $('#message').text('you have successfully registered');
    });
} else {
  $('#message').text('invalid emailaddress or password') 
}    
}
  
$('#register').on('click', register);