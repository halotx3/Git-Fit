const axios = require('axios');
let users = [];
const connection = require('../config/connection.js');
let connections = [];

module.exports = function (io) {
  // Connect
io.sockets.on('connection', function(socket){

  connections.push(socket);
  console.log("Connected: %s socket Connected", connections.length);

  //Disconnect
  socket.on('disconnect', function(data){
    users.splice(users.indexOf(socket.username), 1);
    //updateUsernames();
    connections.splice(connections.indexOf(socket), 1);

    console.log('disconnect %s socket Connected', connections.length);
   })
   // Send Message
  socket.on('send message', function(data){
    
    io.sockets.emit('new message', {activelist: users, msg: data});



   // io.sockets.emit('new message', {activelist: users, msg: data, user: socket.username});
  })
  // New Users
  // socket.on('new user', function(data, callback){
  //   callback(data);
  //
  //   socket.username = result;
  //   users.push(socket.username);
  //   console.log(`${users} HELLO`)
  //   // updateUsernames();
  //
  // })
  socket.on('new users', function (data, callback){
      callback(data);
      // connection.query('SELECT usercreds.email, profile.first_name, usercreds.logged FROM gitfit_db.profile LEFT JOIN gitfit_db.usercreds  on profile.cred_id = usercreds.id WHERE usercreds.logged = 1;', function (err, result) {
        io.sockets.emit('get users', data);
        console.log("alkdjaflkfjlaksjfdlakja;");
    // })
  })
});
}
