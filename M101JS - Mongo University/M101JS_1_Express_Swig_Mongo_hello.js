	var express = require ('express');
	app = express();
	
	// Consolidate is the library that connects a tamplate engine to express. Wrapper for templating
	cons = require('consolidate');
	
	MongoClient = require('mongodb').MongoClient;
	Server = require('mongodb').Server;
	
	
	// Swig is the templating engine used here. 
	
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + "/views" );  // Take the templates from views folder in current dir.
	
	// This is the connection to DB. We are not opening the db here.
	
	var mongoclient = new MongoClient(new Server ('ec2-107-21-143-39.compute-1.amazonaws.com',27017, { 'native_parser': true })) ;
	
	var db = mongoclient.db('course');
	
	
	app.get('/',function(req,res){
		db.collection('hello_mongo_express').findOne({}, function (err, doc){
		   res.render("hello", doc );
		});
	});
	
	// Anything other than / will take the below wild card *
	
	app.get('*',function(req,res){
		res.send("Page not found", 404);
	
	});
	
	mongoclient.open(function(err, mongoclient){     // this is where we are opening the db.
		if (err) throw err; 
		app.listen(8000);
		console.log("Express server started on port 8000");
	});	