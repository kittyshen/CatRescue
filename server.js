var express = require('express');
var bodyParser = require('body-parser');
// var path = require('path');

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express App
// =============================================================
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.text());


var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require('./app/routing/htmlRoutes.js')(app);
var routes = require("./controllers/cats_controller.js");
app.use(routes);

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});