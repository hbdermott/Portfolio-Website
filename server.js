var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
module.exports.ProgressBar = require("progressbar.js");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get("/resume", function(req, res) {
    res.download("public/assets/HunterDermott.pdf");
});

app.get("/about", function(req, res) {
	res.render("about")
});

app.get("*", function(req, res) {
	res.render("invalid")
});

app.listen(8080, function() {
	console.log("Starting Server");
});
