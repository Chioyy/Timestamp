/* eslint-disable linebreak-style */
// Timestamp exericise for freecodecamp

// Depedencies
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

let app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

// Change strings to date and unix date
app.get("/api/timestamp/:date_string", (req, res, next) => {
	let dateString = req.params.date_string;
	let normalDate = Date.parse(req.params.date_string);
	let dateFormat = {weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};
	var utcDate;
	var unixDate;

	// Valid UTC date
	if (isNaN(normalDate) === false) {
		utcDate = new Date(dateString).toLocaleTimeString("en-us", dateFormat);
		unixDate = new Date(dateString).getTime() / 1000;
	}
    
	// Valid unix date
	else if (Number.isInteger(Number(dateString)) === true) {
		utcDate = new Date(dateString * 1000).toLocaleTimeString("en-us", dateFormat);
		unixDate = dateString;
	}

	// Empty string
	else if (dateString == "") {
		utcDate = new Date().toLocaleTimeString("en-us", dateFormat);
		unixDate =  new Date(utcDate).getTime() / 1000;
	}
     
	// Invalid string
	else {
		utcDate = new Date(dateString).toLocaleTimeString("en-us", dateFormat);
		unixDate =  normalDate;
	}

	// Send date back
	next();
	res.json({unix: unixDate, utc: utcDate});
});

// Server listens port 3000
app.listen(3000, () => {
	console.log("Ready");
});
