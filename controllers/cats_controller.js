var express = require("express");
var router = express.Router();

//preapare to use database
var cat = require("../models/cat.js");

//testing data base connection
// var connection = require("../config/connection.js")
// router.get("/",function(req,res){
//     connection.query("SELECT * FROM cats;",function(err,data){
//         if(err) throw err;
//         console.log(data);
//         res.json(data);
//     })
// })

var orm = require("../config/orm.js")
// Create all routes and set up logic within those routes where required.
router.get("/",function(req,res){
    orm.selectAll("cats",function(data){
        // console.log(data);
        // res.json(data);
        res.render("../views/index.handlebars",{cats:data})
    });
})

router.post("/addcat",function(req,res){
    orm.insertOne("cats","cat_name,rescued",[req.body.name,req.body.rescued],function(data){
        // console.log(data);
        res.json(data);

    });
})

router.put("/adpotcat/:id",function(req,res){
     console.log("inside adopt");

    orm.update("cats",{rescued:req.body.rescued},{id:req.params.id},function(data){
        // console.log(data);
        res.json(data);

    });
})
module.exports = router;