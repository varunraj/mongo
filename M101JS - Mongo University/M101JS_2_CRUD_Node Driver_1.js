Adding records to database from a json file.
---------------------------------------------
	@mongoimport -d course -c grades grades.json  ==> This will import the json data in grades.json file to 'course' database and grades collection.
		
	Sample grades.json file.
	
	{ "student" : "Joe", "assignment" : "hw1", "grade" : 90 }
	{ "student" : "Joe", "assignment" : "hw2", "grade" : 91 }
	{ "student" : "Joe", "assignment" : "hw3", "grade" : 92 }
	
Finding One (findOne()) document using the mongodb node driver
--------------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:100};
	  db.collection('grade').findOne(query, function (err, doc) {
	       if (err) throw err;
		   console.dir(doc);
		   db.close();
	  });
	  });

Finding many documents using mongodb driver
--------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:{$gt:50}};
	  db.collection('grade').find(query).toArray(function (err, doc) {
	       if (err) throw err;
		   console.dir(doc);
		   db.close();
	  });
	  });

//Here find() is user and the cursor is calling another method 'toArray' to which there is a call back function.
	
	
Finding many documents using mongodb driver - Using cursor and each method.
---------------------------------------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:{$gt:50}};
	  var cursor = db.collecton('grades').find(query); 
	  
	  cursor.each(function (err,doc) {
	       if (err) throw err;
			
			if (doc == null) {
				return db.close();
			}
			
		   console.dir(doc.student + "got a good grade");
		   
	  });
	  });

//In this example, cursor is not sending any async calls to database. It just defines the cursor. Each method will take docs one by one in an asyc fashion.
// toArray method get all data from database at once. So the call back is executed only after building the whole array. But for the each method, call back function is called for each record coming from database. If we have a large data getting returned, mongo builds the cursor in batches. So it will take a while to buld the whole cursor.

Projection during the find ( Similar to the second parameter in the find method where we specify what all fields should be returned)
------------------------------------------------------------------------------------------------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:{$gt:50}};
	  var projection = {'student':1, '_Id':0}   // Here we specify what all fields are relavent in the return  
	  
	  var cursor = db.collecton('grades').find(query,projection).toArray(function(err,docs){
		if (err) throw err
		docs.forEach (function(doc){
			
			console.dir(doc);
			console.dir(student.name + "got a good grade")
		
	    });
		
		db.close();		
		 
	  });
	  });

     // Note: forEach takes a function and executes for each item in the array. Here docs is an array with the results from find method.


Using $gt and $lt operator for query
---------------------------------------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = { student: Joe, grade:{$gt:50, $lt:70}} 
	  var cursor = db.collecton('grades').find(query); 
	  
	  db.collections('grades').find(query).each(function (err,doc) {
	       if (err) throw err;
			
			if (doc == null) {
				return db.close();
			}
			
		   console.dir(doc)
		   
	  });
	  });

	  
Skip, Limit and Sort Using Options object
-----------------------------------------	  
// Works just like the mongo shell query. Order of executing will be always sort, skip and then limit.

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:{$gt:50}} 
	  var cursor = db.collecton('grades').find(query);
	  cursor.sort({grade:1});
	  cursor.limit(10);
	  cursor.skip(2);
	  
	  
	  cursor.each(function (err,doc) {
	       if (err) throw err;
			
			if (doc == null) {
				return db.close();
			}
			
		   console.dir(doc)
		   
	  });
	  });


