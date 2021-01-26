//Explain in node

var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var cursor = db.collecton('coll').find({x:1}); 
	  
	  cursor.explain(function (err,explain_out) {
	       if (err) throw err;
			
		    console.log(explain_out);
			db.close();
	  });
	  });

	  
// Hinting in Node

var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var cursor = db.collecton('coll').find({x:1},{},{hint:{$natural:1}}); 
	  
	  cursor.explain(function (err,explain_out) {
	       if (err) throw err;
			
		    console.log(explain_out);
			db.close();
	  });
	  });


	  
	  
	  
