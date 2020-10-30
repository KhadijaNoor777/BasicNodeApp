/*console.log('HELLO THERE');
const f = require('fs');

f.writeFileSync('hello.txt', 'hello from node js');*/


var express = require("express");
var path = require("path");
var routes = require("./routes");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('session');
//var session = require('express-session');


var app = express();

app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.use(express.static(__dirname + "images"));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'testdb'
});

connection.connect(function(error){
	if(!!error)
		console.log('Error');
	else
		console.log('Connected');
});

/*app.get('/', function(req, res){
	connection.query("select * from user", function(error, rows, fields)
	{
		if(!!error)
			console.log('Error in query');
		else{
			console.log('Success\n');
			console.log(rows);
		}
	})
})*/

app.use(bodyParser());

app.use(routes);

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})

