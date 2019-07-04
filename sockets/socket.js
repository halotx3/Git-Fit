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
  // io.socket.emit('new player', {
  //   users: users
  // })


  socket.on('send message', function(data){
    console.log(data)
    io.emit('new message', {
    // io.in(`${currentUser}`).emit('new message', {
      id: id,
      msg: data
    });
  });

  socket.on('new player', function(user) {
    currentUser = user
    socket.join(user)
  })

  //connections.push(socket);
  console.log("Connected: %s socket Connected", connections.length);


  socket.on('get user', function(data, callback) {
    callback(data)
    console.log(data)
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
