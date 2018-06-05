var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express(); // Tells node that we are creating an "express" server
var PORT = process.env.PORT || 3000; 

app.use(express.static("app"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());


// require('./app/routing/apiRoutes.js')(app); 
// require('./app/routing/htmlRoutes.js')(app);


app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});