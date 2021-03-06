const axios = require('axios');
const connection = require('../config/connection.js');
let connections = [];
let currentUser = "";



var userCount = 0;
module.exports = function(io) {

// Connect
io.sockets.on('connection', function(socket) {
  const id = socket.id;
  console.log(`This  my socket ID: ######${id}`)
  userCount++;
  socket.on('connectedUser', (users) => {
    socket.name = users;
    io.sockets.emit('userCount', {
      userCount: userCount
    });
    io.sockets.emit('connectedUser', {
      users: users
    });
    console.log(users + ' has joined the chat.');

  });

  socket.on('send message', function(data){
    io.emit('new message', {
    // io.in(`${currentUser}`).emit('new message', {
      id: data.id,
      name: data.name,
      msg: data.msg
    });
  });

  socket.on('new player', function(user) {
    currentUser = user
    socket.join(user)
    for (let i = 0; i < user.length; i++)
    console.log(`Getting Username${user[i].first_name}`)
  })
  //connections.push(socket);
  console.log("Connected: %s socket Connected", connections.length);


  socket.on('get user', function(data, callback) {
    callback(data)

  })

  //Disconnect
  socket.on('disconnect', (user) => {
    userCount--;
    io.sockets.emit('userCount', {
      userCount: userCount
    });
    io.emit('disconnect', user);
    console.log(socket + ' has left the chat.');
  });
})


}
