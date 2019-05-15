const express = require('express');
const connection = require('./config/connection.js');


const PORT = process.env.PORT || 3000;

const app = express();

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
const mainroutes = require('./controller/gitFitController.js');

app.use('/', mainroutes);
app.use('/register', mainroutes);
app.use('/matches', mainroutes);
// app.use('/loggedIn', mainroutes); // Enter the correct file handlebar name here *********

app.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});
