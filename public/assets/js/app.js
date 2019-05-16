

$(function() {
  let socket = io.connect();
  let $messageForm = $('#messageForm');
  let $message = $('#message');
  let $chat = $('#chat');
  let $messageArea = $('#messageArea');
  let $userFormArea = $('#userFormArea');
  let $userForm = $('#userForm');
  let $users = $('#users');
  let $username = $('#username');
  let now = new Date()
  let username = '';
  let html = "";


  $messageForm.submit(function(e) {
    e.preventDefault();

    console.log(now)
    socket.emit('send message', $message.val());
    $message.val('');
  });
  socket.on('new message',  function(data) {

    console.log(data.activelist);
    console.log(data)
    console.log(data)
        $chat.prepend(`<div id=${data.user} class="chatmsg">${data.msg}</div>`).prepend(`User ${now.toLocaleTimeString()}`);
      if (data.activelist[0] == data.user) {
          $(`#${data.user}`).css('background-color', 'lightblue')
        }
        // } else {
        // $('.chatmsg').css('background-color' ,'red')
        // }

  });

  const load = function(e) {
    // e.preventDefault();
    socket.emit('new user', function(data) {
      // if (data) {
      //   // $username.val('');
      //   $userFormArea.hide();
      //   username = data;
      //   console.log(username + '1');
      //   $messageArea.show();
      // }
    });
    $username.val('');
  };
  socket.on('get users', function(data) {

    // let html = "";
      // console.log(data + '2')
      for (let i = 0; i < data.length; i++ ){
      html += `<li class="list-group strong"> ${data[i]}</li>`;
      $users.html(html);
    };
  });

  // load();

  console.log(html);
});
