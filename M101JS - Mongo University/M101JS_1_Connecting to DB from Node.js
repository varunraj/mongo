*******************************
Connecting to Mongo from Node**
*******************************

 var MongoClient = require('mongodb').MongoClient;
 
 // Open connection to the server
 
 MongoClient.connect('mongodb://localhost:27017/mydb', function(err,db) {
 
      if (err) throw err;
	  
	  // find out one doc in the collection
	  
	  db.collection('people').findOne({}, function (err, doc) {
	  
	       if (err) throw err;
		   
		   // Print the result to console
		   
		   console.dir(doc);
		   
		   // Close the db
		   
		   db.close();
	  });
	  
	  // This will be printed first - Async
	  
	  console.dir ("Called Find One !!");
	  
	  });
	 

