var connection = require("./connection.js");

//todo 
// selectAll()
// insertOne()
// updateOne()
 
var orm ={
    //property 1 function select all from the database
    selectAll:function(tableName, callback){
        connection.query("SELECT * FROM "+tableName+";",function(err,data){
            if (err) throw err;
            callback(data); //pass back the data from database to the callback function to be used in cat.js then to cat controller then rendered on webpage
        });
    },
    insertOne:function(tableName,columns,values, callback){
        console.log("INSERT INTO "+tableName+" (" +columns.toString() +") VALUES (?,?);" )
        connection.query("INSERT INTO "+tableName+" (" +columns +") VALUES (?,?) "+";",values,function(err,data){
            if (err) throw err;
            callback(data); //pass back the data from database to the callback function to be used in cat.js then to cat controller then rendered on webpage
        });
    },
    update: function (tableName, objColVals, condition, cb) {
        var queryString = "UPDATE " + tableName;
        queryString += " SET ? ";
        queryString += " WHERE ? ";
        // queryString += condition;

        console.log(queryString);
        connection.query(queryString, [objColVals,condition], function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }

}

module.exports = orm;
