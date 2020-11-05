const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
}); 


const wikiSchema = new mongoose.Schema({
	title: String,
	content: String
});

const Wiki = mongoose.model("article", wikiSchema);


app.route("/articles") 
.get(function(req, res) {
	Wiki.find(function(err, foundArticles) {
		if (!err) {
			res.send(foundArticles);
		} else {
			res.send(err);
		}
		
	});
	
})

.post(function (req, res) {

	const articleOne = new Wiki({
	title: req.body.title,
	content: req.body.content
});

	articleOne.save(function (err) {
		if (!err) {
			res.send("Sucessfully added a new entry ")
		} else {
			res.send(err);
		}
		});
})


.delete(function(req, res) {
	Wiki.deleteMany(
	{},
	function(err) {
		if (!err) {
			res.send("All items deleted");
		} else{
			res.send(err);
		}
		
	});
});


app.route("/articles/:articleName")
.get(function (req, res) {
	let pass = req.params.articleName;

	Wiki.findOne({title: pass}, function (err, foundArticle) {
		if (foundArticle) {
			res.send(foundArticle);
		} else {
			res.send("No articles matching title");
		}
		
	});

	
})

.put(function(req, res) {
	let pass = req.params.articleName;

	Wiki.update(
		{title: pass},
		{title: req.body.title, content: req.body.content},
		{overwrite: true},
		function (err) {
			if (!err) {
				res.send("Entry has been replaced");
			} else {
				res.send(err);
			}
		
		});
	
})

.patch(function(req, res) {
	let pass = req.params.articleName;

	Wiki.update(
		{title: pass},
		{$set: req.body},
		function(err) {
			if (!err) {
				res.send("Entry has been updated");
			} else {
				res.send(err);
			}
			
		});
	
})

.delete(function(req, res) {
	let pass = req.params.articleName;

	Wiki.deleteOne(
		{title: pass},
		function (err) {
			if (!err) {
				res.send("Entry has been deleted");
			} else {
				res.send(err)
			}
		})
});


app.listen(3000, function(req, res) {
	console.log("Server is runing on port 3000....");

});