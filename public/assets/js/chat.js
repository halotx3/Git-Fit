$(function() {
  var url = window.location.pathname;
  // console.log(url)
  var id = url.substring(url.lastIndexOf('/') + 1);
  let socket = io.connect();
  let $messageForm = $('#messageForm');
  let $message = $('#message');
  let $chat = $('#chatBody');
  let $messageArea = $('#messageArea');
  let $userFormArea = $('#userFormArea');
  let $userForm = $('#userForm');
  let $users = $('#users');
  let $username = $('#username');
  let $body = $('.chatmsg')
  let username = '';
  let html = "";
  let now = moment().fromNow();


  $messageForm.submit(function(e) {
    e.preventDefault();



  $.post(`/profile/${id}`).then(function(data){
    socket.emit('send message', { name: data[0].first_name, id: id, msg: $message.val() });
    $message.val('');
  })

  socket.emit('new player', {
  username: $username

  })

})
socket.on('new message',  function(data) {
  // console.log(JSON.parse(JSON.stringify(data)));
      $chat.append(`<div class="chatmsg"> <strong>${data.name}:</strong></div>`);
      $chat.append(`<div class="text-chat" id=${data.id}>${data.msg}</div>`);
});

})
