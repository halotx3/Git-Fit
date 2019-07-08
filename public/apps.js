const isValidPassword = function (password1, password2) {
    return password.length >= 8;
  }
  
  const isValidemailAddress = function (username) {
    return emailaddress.length >= 8;
  }
  
  const register = function () {
    const password1 = $('#password1').val().trim();
    // const password2 = $('#password2').val().trim();
    const username = $('#emailaddress').val().trim();
  
    if (isValidPassword(password1, password2) && isValidemailAddress(username)) {
      const data = {
        username: username,
        password: password1
      }
  
      $.post('/api/user', data, function () {
          $('#message').text('you have successfully registered');
        });
    } else {
      $('#message').text('invalid emailaddress or password') 
    }
    
  }
  
  $('#register').on('click', register);