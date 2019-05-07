const express = require('express');
const connection = require('./config/connection.js');


const PORT = process.env.PORT || 3000;

const app = express();

// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static('public'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.


// Import routes and give the server access to them.
// const routes = require('./controllers/Controller.js');

// app.use(routes);

app.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});
