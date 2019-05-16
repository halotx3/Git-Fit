const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const time = require('date-and-time');

// const connection = require('./config/connection.js');


const PORT = process.env.PORT || 3000;

require('./sockets/socket')(io);

// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Import routes and give the server access to them.

const everRoutes = require('./controller/emailVerifyController.js');
app.use(everRoutes);
//Routes for Logging in
const logonRoutes = require('./controller/loginController');
app.use(logonRoutes);
const mainroutes = require('./controller/gitFitController.js');
const chatRoutes = require('./controller/chatController.js');
const surveyRoutes = require('./controller/surveyController.js');
app.use(chatRoutes);
app.use(surveyRoutes);

app.use('/', mainroutes);

app.use('/survey', mainroutes);
app.use('/register', mainroutes);
app.use('/matches', mainroutes);
// app.use('/loggedIn', mainroutes); // Enter the correct file handlebar name here *********

server.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});
