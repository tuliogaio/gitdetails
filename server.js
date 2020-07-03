// web framework for node
const app = require("express")(); 

// used to autoload models, routes, schemas, configs, controllers, object maps, etc.
const consign = require("consign"); 

// package that allows transactions between applications in different sources
const cors = require("cors");

// configure database connection sqlite3
const database = require("./config/database");

// allow node use cors
app.use(cors());

// associates the variable with the instance of the database connection
app.db = database;

// load project dependencies
consign()
  .then("./services/github.js")
  .then("./config/routes.js")
  .into(app);

// set backend server port to listen
const port = 3000;

// start server with sethings
app.listen(port, () => {});
