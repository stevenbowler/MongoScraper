
// Dependencies
var express = require("express");
var mongoose = require("mongoose");
require('dotenv/config');



// Initialize Express
var app = express();


/**
 * Express Handlebars {@link https://www.npmjs.com/package/express-handlebars}
 * @name exphbs
 * @external
 */
var exphbs = require("express-handlebars");

// set display engine to handlbars starting at main.handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");





//Middleware


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// enable urlencoding in express calls to simplify url syntax
app.use(express.urlencoded({ extended: true }));

// enable json parsing of strings
app.use(express.json());


/**
 * Import routes and give the server access to them.
 * @name routes
 * @memberof module:controllers/burgers_controller
 */
var routes = require("./controller/routes.js");

/** Leave base route at "/" as route to routes module */
app.use(routes);


// See activiy 11 for load of goodreads.com into mongoose mongo atlas test db collection books stevenbowler

// connect to Mongo DB
//  mongodb+srv://sbowler:sbowler@cluster0-z0lp4.gcp.mongodb.net/test?retryWrites=true&w=majority
var databaseUrl = "mongodb+srv://sbowler:sbowler@cluster0-z0lp4.gcp.mongodb.net/bootcamp?retryWrites=true&w=majority"
mongoose.connect(
    databaseUrl,  // pull from .env file in react folder
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to Mongo DB') }
);


// Set the app to listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
