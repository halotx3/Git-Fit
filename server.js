const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const time = require('date-and-time');
const helmet = require('helmet');
const randomstring = require("randomstring");
const bodyparser = require('body-parser');
require('moment');
require('./sockets/socket')(io);
// const connection = require('./config/connection.js');


const PORT = process.env.PORT || 3000;



// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static(__dirname + "/public"));



//Additional Securities
app.use(helmet());
// Parse request body as JSON
app.use(express.urlencoded({ extended: true, limit:"50mb", parameterLimit:50000 }));
app.use(express.json({limit:"50mb"}));


// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ 
  defaultLayout: 'main'
  // ,
  // partialsDir: __dirname + 'views/partials',
  // layoutsDir: __dirname + 'views/layouts'
 }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
// app.registerPartials(__dirname + '/views/partials');
// app.set('partialsDir', __dirname + '/views/partials');
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
app.use('/register', logonRoutes);
// app.use(express.limit(100000000));
// app.use(express.bodyParser({limit:"50mb"}));

app.use('/survey', surveyRoutes);
app.use('/matches', mainroutes);
app.use('/login1', mainroutes);
app.use('/profile-match', mainroutes);
// app.use('/loggedIn', mainroutes); // Enter the correct file handlebar name here *********

server.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});
