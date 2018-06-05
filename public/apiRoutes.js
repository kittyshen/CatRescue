// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
var users = require("../data/friends.js");

var user;

// fs.readFile(path.join(__dirname, "../data/friends.txt"),"utf8" , function(err,data){
//     if (err) {
//         return console.log(err);
//     }
//     console.log(data);
//     var user1 = JSON.parse(data);
//     console.log(user1);

// });
fs.readFile(path.join(__dirname, "../data/friends.txt"),"utf8" , function(err,data){
    if (err) {
        return console.log(err);
    }
    // console.log(data);
    user = JSON.parse(data);
    console.log(user);
});

module.exports = function(app){

    app.get("/api/friends", function(req, res){
        //test print out all users info
        return res.json(user);
        
    });
      
    app.post("/api/friends", function(req, res) {

        var json = req.body;
        // console.log(json);

        
        //define a fucntion to compare the score property of one obj from the obj array to target obj
        function compare(obj,targetObj){
            var totalDiff = 0;  //capture the difference of each score inside the score array
            for(var i = 0; i<10; i++){
                totalDiff += Math.abs(parseInt(obj.score[i]) - parseInt(targetObj.score[i]));
            }
            return totalDiff;
        }
        // get old user infomation, which will be a list of obj, and do the comparition
        var minDiff = 40; // start with max possible difference points
        var minIndex = 0;
        for(var i = 0; i<user.length; i++){
            var currentDiff = compare(user[i],json);  // get the total current difference of the old user obj in the user array to just added new target user

            if(currentDiff < minDiff){
                minDiff = currentDiff; 
                minIndex = i;   //capture the minDifference user's index id to be used later as return object
            }
        }
        var returnMatch = user[minIndex];


        console.log(user);
        user.push(json);
        //use file system to maintain data user entered
        fs.writeFile(path.join(__dirname, "../data/friends.txt"),JSON.stringify(user) , function(err){
            if (err) {
                return console.log(err);
            }
        });

        // fs.readFile(path.join(__dirname, "../data/friends.txt"),"utf8" , function(err,data){
        //     if (err) {
        //         return console.log(err);
        //     }
        //     user = JSON.parse(data);
        //     // console.log(user);

        // });

        console.log(json);
        // users.push(json);
        // res.json(json); 
        return res.json(returnMatch); 

    });
}
