
// basic configuration
var express = require('express');
var app = express();
require("dotenv").config({ path: "db.env" });
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// index file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Timestamp Microservice 
app.get("/api/:date?", function (req, res) {
  let parDate = req.params.date;
  let date;
  if (!parDate) {
    date = new Date();
  } else {
    date = isNaN(parDate) ? new Date(parDate): new Date (parDate*1); 
  }
  if (date == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    let unix = date.getTime();
    const utc = date.toUTCString();
    res.json({ unix, utc });
  }
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

