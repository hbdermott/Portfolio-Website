var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

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
	res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact", {done: false});
});

app.post("/contact", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var message = req.body.message;
    res.render("contact", {done:true});
});

app.get("*", function(req, res) {
	res.render("invalid")
});

app.listen(8080, function() {
	console.log("Starting Server");
});

