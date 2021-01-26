Getting Reddit data to file
---------------------------
	1) Go to reddit technology page and append .json in the end == >   http://www.reddit.com/r/technology/.json
	This will give json version of the page.
	
	2) Curl this to a file
	
	@curl http://www.reddit.com/r/technology/.json > reddit.json.

Getting Reddit data to Mongo
----------------------------
	
	
	var MongoClient = require('mongodb').MongoClient;
	var request = require('request'); // This is the module used to make a http request
	
	MongoClient.connect('mongodb://localhots:27017/course', function(err,db){
		
		if (err) throw err

		
		request('http://www.reddit.com/r/technology/.json', function (error, response, body) {
		  if (!error && response.statusCode == 200) {3
			
			var obj = JSON.parse(body)   // JSON.parse is used to parse string to JSON object.
			var stories = obj.data.children.map(function(story) { return story.data }); // map function goes through every elements of the array and apply the call back fuction provided in map to create a new array.
			
			db.collection('reddit').insert(stories, function(err, data) {
				if (err) throw err;
				
				console.dir(data);
				db.close();
				
			});
		};
	});
});


Find all docs that have 'NSA' in the title field of the reddit data.
---------------------------------------------------------------------------

	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = { title: {$regex:'NSA'}}
	  var projection = {_id:0, title:1}
	  
	  	  
	  db.collections('reddit').find(query,projection).each(function (err,doc) {
	       if (err) throw err;
			
			if (doc == null) {
				return db.close();
			}
			
		   console.dir(doc.title)
		   
	  });
	  });
	  
	});
	
Using dot notation in queries ( This is done when we have document inside a document.
-------------------------------------------------------------------------------------
// In the reddit data set when there is video attached to the post, media field have another document inside it called 'oembed' which again have another doc inside it with field value as 'type'


	var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost:27017/course', function(err,db) {
    if (err) throw err;
	  var query = {"media.oembed.type" : 'video'}
	  var projection = {_id:0, "media.oembed.url" : 1}
	  
	  	  
	  db.collections('reddit').find(query,projection).each(function (err,doc) {
	       if (err) throw err;
			
			if (doc == null) {
				return db.close();
			}
			
		   console.dir(doc.title)
		   
	  });
	  });
	  
	});
	


