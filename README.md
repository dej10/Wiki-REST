# Wiki-REST

## Installation

In the working directory, initialize npm and install packages.
PostMan is recommended to test the GET, POST, PUT , PATCH and DELETE methods.


```bash
npm init -y 
npm i express body-parser ejs mongoose nodemon

```

## Server Starting Code
```javascript
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

```


## Example Documents
```bash


/* 1 */
{
    "_id" : ObjectId("5fa05fea3773521e16a85050"),
    "title" : "RESTFUL APIs",
    "content" : "The most popular structure for apis"
}

/* 2 */
{
    "_id" : ObjectId("5fa0602e3773521e16a85064"),
    "title" : "REST",
    "content" : "Stands for REprestantional State Transfer"
}

/* 3 */
{
    "_id" : ObjectId("5fa062983773521e16a850c0"),
    "title" : "API",
    "content" : "Stands for Application programming interface"
}

/* 4 */
{
    "_id" : ObjectId("5fa07850792e733614c216e0"),
    "title" : "Bootstrap",
    "content" : "Front-end framework",
    "__v" : 0
}

/* 5 */
{
    "_id" : ObjectId("5fa1b84986d58934d8dd239d"),
    "title" : "Arsenal",
    "content" : "Under Arsene Wenger arsenal managed to win 26 draw 12 and lose 0",
    "__v" : 0
}

```





