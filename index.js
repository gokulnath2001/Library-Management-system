//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { truncate } = require("lodash");
const studentRoute = require("./routes/studentRoute");
const Book = require("./models/books");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("images"));

mongoose.connect('mongodb://localhost:27017/LibraryDB',
{
  useNewurlParser: true
});

app.get("/",function(req, res){
  res.render("home");
});

app.get("/allbooks", function(req, res){
  Book.find({}, function(err, founduser){
    res.render("allbooks",{ founduser:founduser});
  });
});

app.get("/aboutus", function(req, res){
  res.render("aboutus");
});

app.use("/student", studentRoute);

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});