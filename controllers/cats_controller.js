var express = require("express");
var router = express.Router();

//preapare to use database
var cat = require("../models/cat.js");

//testing data base connection
var connection = require("../config/connection.js")
router.get("/",function(req,res){
    connection.query("SELECT * FROM cats;",function(err,data){
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})

// Create all routes and set up logic within those routes where required.
// router.get("/",function(req,res){
//     connection.query("SELECT * FROM cats;",function(err,data){
//         if(err) throw err;
//         console.log(data);
//     })
// })

module.exports = router;