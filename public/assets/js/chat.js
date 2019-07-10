$(function() {
  let socket = io.connect();
  let $messageForm = $('#messageForm');
  let $message = $('#message');
  let $chat = $('#chatBody');
  let $messageArea = $('#messageArea');
  let $userFormArea = $('#userFormArea');
  let $userForm = $('#userForm');
  let $users = $('#users');
  let $username = $('#username');
  let username = '';
  let html = "";
  let now = moment().fromNow();


  $messageForm.submit(function(e) {
    e.preventDefault();

    socket.emit('send message', $message.val());
    $message.val('');

    var url = window.location.pathname;
    // console.log(url)
    var id = url.substring(url.lastIndexOf('/') + 1);

  $.post(`/profile/${id}`).then(function(data){
    $chat.append(`${data[0].first_name}: ${now}`);
  })

  socket.emit('new player', {
  username: $username

  })

})
socket.on('new message',  function(data) {
  // console.log(JSON.parse(JSON.stringify(data)));

      $chat.append(`<div id=${data.id} class="chatmsg">${data.msg}</div>`);
});

})
