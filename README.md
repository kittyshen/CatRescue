# CatRescue
# Node Express Handlebars
### UC Berkeley coding assignment 4

### Overview

In this assignment, you'll create a cat rescure logger with MySQL, Node, Express, Handlebars and a homemade ORM (yum!). Be sure to follow the MVC design pattern; use Node and MySQL to query and route data in your app, and Handlebars to generate your HTML.

### Important

Be sure to utilize the [MYSQL Heroku Deployment Guide](../../resources/pdf/MySQLHerokuDeploymentProcess.pdf) in order to deploy your assignment.

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
     * **devoured**: a boolean.

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
