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
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them.
<<<<<<< HEAD
// const routes = require('./controllers/gitFitController.js');
const routes = require('./controller/gitFitController.js');

app.use(routes);
// const routes = require('./controllers/Controller.js');
=======
const everRoutes = require('./controller/emailVerifyController.js');
>>>>>>> 25908d5f10de33c665db30567819b6130c6f2ca0

app.use(everRoutes);
const mainroutes = require('./controller/gitFitController.js');

app.use(mainroutes);

app.listen(PORT, function() {
  console.log('App now listening at localhost:' + PORT);
});


<<<<<<< HEAD


=======
>>>>>>> 25908d5f10de33c665db30567819b6130c6f2ca0
