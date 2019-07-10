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


   console.log(now)
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

  // const load = function(e) {
  //   // e.preventDefault();
  //   socket.emit('new user', function(data) {
  //     console.log(data)
  //     // if (data) {
  //     //   // $username.val('');
  //     //   $userFormArea.hide();
  //     //   username = data;
  //     //   console.log(username + '1');
  //     //   $messageArea.show();
  //     // }
  //   });
  //   $username.val('');
  // };
  // socket.on('get user', function(data) {
  //   $.ajax(`/profile/${id}`, {
  //     type:'GET'
  //   }).then(
  //     function(){
  //       console.log(id);
  //
  //     })
  //
  // })


  // load();

  // console.log(html);
})
socket.on('new message',  function(data) {
  console.log('1')
  // console.log(JSON.parse(JSON.stringify(data)));

      $chat.append(`<div id=${data.id} class="chatmsg">${data.msg}</div>`);
});

})
