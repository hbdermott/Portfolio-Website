const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const {Datastore} = require('@google-cloud/datastore');
const projectId = "silicon-clock-255004";

const datastore = new Datastore({
  projectId: projectId,
});
const kind = "contact";


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
    var key = datastore.key([kind, req.body.name]);
    var contact = {
            key: key,
            data: {
                email: req.body.email,
                number: req.body.number,
                message: req.body.message
            }
    };
    datastore
  .save(contact)
  .then(() => {
    console.log(`Saved ${contact.key.name}: ${contact.data}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
res.render("contact", {done:true});
});

app.get("*", function(req, res) {
	res.render("invalid")
});

app.listen(8080, function() {
	console.log("Starting Server");
});

