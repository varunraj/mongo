	var express = require ('express');
	app = express();
	
	// Consolidate is the library that connects a tamplate engine to express. Wrapper for templating
	cons = require('consolidate');
	
	// Swig is the templating engine used here. 
	
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.set('views', __dirname + "/views" );  // Take the templates from views folder in current dir.
	
	app.get('/',function(req,res){
		res.render("Hello",{ name:"Swig" } );
	
	});
	
	// Anything other than / will take the below wild card *
	
	app.get('*',function(req,res){
		res.send("Page not found", 404);
	
	});
	
	app.listen(8000);
	console.log("Express server started on port 8000");