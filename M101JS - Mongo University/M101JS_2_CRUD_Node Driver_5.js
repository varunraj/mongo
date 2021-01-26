findAndModify
==============














Remove
=======

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {grade:100};
	  db.collection('grade').remove(query, function (err, removed) {
	       if (err) throw err;
		   console.dir("Sucessfully removed"+removed+ "documents");
		   return db.close();
	  });
	  });
