# CatRescue
# Node Express Handlebars
### UC Berkeley coding assignment 12

### Overview

In this assignment, you'll create a cat rescure logger with MySQL, Node, Express, Handlebars and a homemade ORM (yum!). Be sure to follow the MVC design pattern; use Node and MySQL to query and route data in your app, and Handlebars to generate your HTML.

### Before You Begin

* Rescue-Da-cat! is a cat rescue app that lets users input the names of cats they'd like to save.

* Whenever a user submits a cat's name, your app will display the cat on the left side of the page -- waiting to be adopted.

* Each cat in the waiting area also has a `Adopt it!` button. When the user clicks it, the cat will move to the right side of the page.

* Your app will store every cat in a database, whether adopted or not.


### Submission on BCS

* Please submit both the deployed Github.io link to your homework AND the link to the Github Repository!

## Instructions

#### App Setup

1. Create a GitHub repo called `catrescue` and clone it to your computer.

2. Make a package.json file by running `npm init` from the command line.

3. Install the Express npm package: `npm install express`.

4. Create a server.js file.

5. Install the Handlebars npm package: `npm install express-handlebars`.

6. Install the body-parser npm package: `npm install body-parser`.

7. Install MySQL npm package: `npm install mysql`.

8. Require the following npm packages inside of the server.js file:
   * express
   * body-parser

#### DB Setup

1. Inside your `cat` directory, create a folder named `db`.

2. In the `db` folder, create a file named `schema.sql`. Write SQL queries this file that do the following:

   * Create the `cats_db`.
   * Switch to or use the `cats_db`.
   * Create a `cats` table with these fields:
     * **id**: an auto incrementing int that serves as the primary key.
     * **cat_name**: a string.
     * **rescued**: a boolean.

3. Still in the `db` folder, create a `seeds.sql` file. In this file, write insert queries to populate the `cats` table with at least three entries.

4. Run the `schema.sql` and `seeds.sql` files into the mysql server from the command line

5. Now you're going to run these SQL files.

   * Make sure you're in the `db` folder of your app.

   * Start MySQL command line tool and login: `mysql -u root -p`.

   * With the `mysql>` command line tool running, enter the command `source schema.sql`. This will run your schema file and all of the queries in it -- in other words, you'll be creating your database.

   * Now insert the entries you defined in `seeds.sql` by running the file: `source seeds.sql`.

   * Close out of the MySQL command line tool: `exit`.

#### Config Setup

1. Inside your `cat` directory, create a folder named `config`.

2. Create a `connection.js` file inside `config` directory.

   * Inside the `connection.js` file, setup the code to connect Node to MySQL.

   * Export the connection.

3. Create an `orm.js` file inside `config` directory.

   * Import (require) `connection.js` into `orm.js`

   * In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

     * `selectAll()`
     * `insertOne()`
     * `updateOne()`

   * Export the ORM object in `module.exports`.

#### Model setup

* Inside your `cat` directory, create a folder named `models`.

  * In `models`, make a `cat.js` file.

    * Inside `cat.js`, import `orm.js` into `cat.js`

    * Also inside `cat.js`, create the code that will call the ORM functions using cat specific input for the ORM.

    * Export at the end of the `cat.js` file.

#### Controller setup

1. Inside your `cat` directory, create a folder named `controllers`.

2. In `controllers`, create the `cats_controller.js` file.

3. Inside the `cats_controller.js` file, import the following:

   * Express
   * `cat.js`

4. Create the `router` for the app, and export the `router` at the end of your file.

#### View setup

1. Inside your `cat` directory, create a folder named `views`.

   * Create the `index.handlebars` file inside `views` directory.

   * Create the `layouts` directory inside `views` directory.

     * Create the `main.handlebars` file inside `layouts` directory.

     * Setup the `main.handlebars` file so it's able to be used by Handlebars.

     * Setup the `index.handlebars` to have the template that Handlebars can render onto.

     * Create a button in `index.handlebars` that will submit the user input into the database.


#### Directory structure

All the recommended files and directories from the steps above should look like the following structure:

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── cats_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── cat.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── img
│   │       └── cat.png
│   └── test.html
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

### Key learning points

* rename your heroko app deployment using this inside the project folder
```
heroku apps:rename kittycat-rescue
```
* heroku server error debug
```
heroku logs -t
```

```javascript
// orm creating quick reference
var orm ={
    //property 1 function select all from the database
    selectAll:function(tableName, callback){
        connection.query("SELECT * FROM "+tableName+";",function(err,data){
            if (err) throw err;
            callback(data); //using callback pass back the data from database 
        });
    },
    insertOne:function(tableName,columns,values, callback){
        connection.query("INSERT INTO "+tableName+" (" +columns +") VALUES (?,?) "+";",values,function(err,data){
            if (err) throw err;
            callback(data); //pass back the data from database 
        });
    }
}
``` 

```javascript
// model creating quick reference
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
    }
}
```

```javascript
//controller quick reference
//display all cats info on root path res.render do the display require handlebar npm on server
router.get("/",function(req,res){
    cat.all(function(data){
        // res.json(data);
        res.render("../views/index.handlebars",{cats:data}) // render to handlebar template
    });
})

//add a cat
router.post("/addcat",function(req,res){
    cat.add("cat_name,rescued",[req.body.name,req.body.rescued],function(data){
        // console.log(data);
        res.json(data);
    });
})

//change cat status
router.put("/adpotcat/:id",function(req,res){
    cat.update({rescued:req.body.rescued},{id:req.params.id},function(data){
        // console.log(data);
        res.json(data);
    });
})
module.exports = router;

```

```javascript
//client side ajax calls quick reference
$("#addCat").on("submit",function(event){
		event.preventDefault();
		var catName = $("[name=catname]").val().trim(); //grab value from form
		var newCatObj = {
			name:catName,
			rescued:0
		}
		console.log(newCatObj);
		$.post("/addcat",newCatObj)
		.then(function(){
			location.reload();
		});
});

```

```javascript
// ajax call put method quick reference
$(".adpBtn").on("click",function(event){
		event.preventDefault();	
		var catid = $(this).data("id");
		var newCatObj = {
			rescued:1,
		}
		console.log(newCatObj);

		$.ajax("/adpotcat/"+catid, {
			type: "PUT",
			data: newCatObj
		})
		.then(function(){
			console.log("changed adopted to", true);
			location.reload();
		});

});

``` 

```javascript
//server side handle bar quick reference and 
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require('./app/routing/htmlRoutes.js')(app);
var routes = require("./controllers/cats_controller.js");
app.use(routes);

```

```javascript
//heroku database set up quick reference
var connection;

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  //local database setting goes here
  connection = mysql.createConnection({
    host: "localhost",
  ...
  })
}

```  

``` html
<!-- handlebar basic usuage quick reference-->
	<div class = "col-md-4 col-sm-4">
		<ul>
			{{#each cats}}
				{{#unless rescued}}
					<div class ="alert alert-info ">
						<li>
							<p> {{id}} : {{cat_name}}</p>
							<img src="assets/img/meow.png" width =80px alt="catbaby">
							<form id ="adpotCat"  method="POST">
							<button type="submit" class = "btn btn-primary adpBtn" data-id={{id}}>Adpot Meow</button>
							</form>
						</li>
					</div>
				{{/unless}}
			{{/each}}
		</ul>
	</div>
```

## Link to the site
[https://kittycat-rescue.herokuapp.com/](https://kittycat-rescue.herokuapp.com/)

## Author 
[Kitty Shen ](https://github.com/kittyshen)

https://github.com/kittyshen

### [Link to Portfolio Site](https://kittyshen.github.io/Portfolio/)

## License
Standard MIT License