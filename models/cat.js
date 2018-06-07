var orm = require("../config/orm.js");

var cat = {
    all: function(callback){
        orm.selectAll("cats",function(response){
            callback(response);
        });
    },
    add:function(col,val,callback){
        orm.insertOne("cats",col,val,function(response){
            callback(response);
        });
    },
    update:function(objColVal,condition,callback){
        orm.updateOne("cats",objColVal,condition,function(response){
            callback(response);
        });
    }
}

module.exports = cat;
