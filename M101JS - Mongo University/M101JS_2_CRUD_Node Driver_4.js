Update (replacement of the whole doc
------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
		if (err) throw err;
			
		var query = { 'assignment': 'hw1' };
		db.collection(grades).findOne(query, function(err, doc){
			if (err) throw err;
			if (!doc) {
				console.log('No documents for assignment'+ query.assignment + "found");
				return db.close();
			}
		
		
		// we are buildng the query again to make sure we are updating the previously selected doc by updating doc's _id to new query. This prevents going to another doc that also have assignment value as 'hw1'
		
		query['_id'] = doc ['_id']; 

		// now make change the returned doc 
		doc['date_returned'] = new Date();
		
		db.collection('grades').update(query, doc, function(err, updated){
	  
			if (err) throw err;
			console.dir("Sucessfully updated " + updated + "documents()");
			return db.close();
		
		});
		
		});
	  
	});


Update (Only a particular field)
---------------------------------
// In this example, it will update only one doc. Eventhough query return multiple docs.


	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
		if (err) throw err;
			
		var query = { 'assignment': 'hw1' };
				
		var operator = {$set:{'date_returned':new Date()}}
		
		db.collection('grades').update(query, operator, function(err, updated){
	  
			if (err) throw err;
			console.dir("Sucessfully updated " + updated + "documents()");
			return db.close();
		
		
		
		});
	  
	});

Update (multi update)
----------------------
// In this example, it will update all docs in the return cursor.


	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
		if (err) throw err;
			
		var query = { 'assignment': 'hw1' };
				
		var operator = {$set:{'date_returned':new Date()}}
		
		var options = {mutli:true}
		
		db.collection('grades').update(query, operator, options, function(err, updated){
	  
			if (err) throw err;
			console.dir("Sucessfully updated " + updated + "documents()");
			return db.close();
		
		
		
		});
	  
	});


UPSERT ( Update and Insert )
-------
// In this example, it will update all docs in the return cursor.


	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
		if (err) throw err;
			
		var query = { student:'Frank', assignment: 'hw1' };
				
		var operator = { student:'Frank', assignment: 'hw1', grade:100 };
		
		var options = {upsert:true}
		
		db.collection('grades').update(query, operator, options, function(err, upserted){
	  
			if (err) throw err;
			console.dir("Sucessfully updated " + upserted + "documents");
			return db.close();
		
		
		
		});
	  
	});

Save ==> Save can also used in place of update.
----------------------------------------------
Save will behave as both upsert and Insert. If we give _id value to save, then it will work as an upsert. If no _Id is given, it will work as update.


