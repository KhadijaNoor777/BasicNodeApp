var express = require("express");

var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('session');


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'testdb'
});

router.get("/", function(req, res) {
    //console.log("hello I'm on the start page");
	res.render("home");
});

router.get("/home", function(req, res) {
    //console.log("hello I'm on the start page");
	res.render("home");
});

router.get("/logIn", function(req, res) {
    //console.log("hello I'm on the start page");
	res.render("logIn");
});

router.get("/ff", function(req, res) {
    //console.log("hello I'm on the start page");
	res.render("ffeedback");
});

router.get("/feedback", function(req, res) {
    //console.log("hello I'm on the start page");
	res.render("feedback");
});

router.get("/vu", function(req, res) {
    //console.log("hello I'm on the start page");
	 var q = "select * from user";
	 connection.connect(function(error){
	  	if(error)
	  		throw error;
	  });

	 connection.query(q, function(error, rows, fields)
	{
		if(!!error)
			console.log('Error in query');
		else{
			console.log('Success\n');
			console.log(rows);
			res.render('logIn', {data: rows});
		}
	})
	 //res.redirect('/home');
	

	 //res.render('logIn', {data: rows});


});

router.post("/save", function(req, res) {
    

	  console.log(req.body);

	   var q = "INSERT INTO user (name, email, planguage) values ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.planguage+"')"

	  connection.connect(function(error){
	  	if(error)
	  		throw error;
	  });


	  connection.query(q, function(error){
	  	if(error)
	  		throw error;
	  res.redirect("/ff");
	  });
 
  // insert user data into users table
  //var sql = connection.query('INSERT INTO user (name, email, password) values ('"+req.body.name+"', '"+req.body.email+"', '"+req.body.password+"')');
  /*connection.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });*/
  // redirect to user form page after inserting the data
});

router.post("/li", function(req, res) {
    //console.log("hello I'm on the start page");
    var q = "select * from user where email = '"+req.body.email+"' AND password = '"+req.body.password+"'";
   //  connection.connect(function(error){
	  // 	if(error)
	  // 		throw error;
	  // });
    connection.query(q, function(error, result){
	 if(error)
	  		throw error;
	 else {

	 	console.log(result);
	 	if(result)
			res.render("feedback");
		else
			res.render("ffeedback");
	}
	});
});

module.exports = router;