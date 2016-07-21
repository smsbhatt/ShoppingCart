var mysql = require("mysql");

// First you need to create a connection to the db

// module.exports = class mySql{
// 	constructor() {
// 		this.con = mysql.createConnection({
// 			  host: "localhost",
// 			  user: "root",
// 			  password: "password",
// 			  database: "ShoppingCart"
// 			});
// 		this.con.connect();
// 	}
// 	// con.connect();
// }

// function mySql() {
// 	this.con = mysql.createConnection({
// 			  host: "localhost",
// 			  user: "root",
// 			  password: "password",
// 			  database: "ShoppingCart"
// 			});
// 	this.con.connect();
// }

// module.exports = new mySql();

module.exports = function(){
		var db = mysql.createConnection({
			  host: "localhost",
			  user: "root",
			  password: "password",
			  database: "ShoppingCart"
			});
		return db;
	}