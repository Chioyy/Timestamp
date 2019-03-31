// Timestamp exericise for freecodecamp

// Dependencies
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
	let unixDate = new Date(dateString).getTime() / 1000;
	let dateFormat = {weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};
	let utcDate = new Date(dateString).toLocaleTimeString("en-us", dateFormat);
	let dateObj = {};
	
	// Valid normal date
	if (isNaN(normalDate) === false) {
		dateObj = {unix: unixDate, utc: utcDate};
	}
	// Valid unix date
	else if (Number.isInteger(Number(dateString)) === true) {
		dateObj = {unix: dateString, utc: new Date(dateString * 1000).toLocaleTimeString("en-us", dateFormat)};
	}
	// Empty string
	else if (normalDate == null) {
		normalDate = new Date();
		dateObj = {unix: normalDate.getTime() / 1000, utc: utcDate};
	}
	// Invalid string
	else {
		dateObj = {unix: normalDate, utc: "Invalid Date"};
	}

	// Send date back
	next();
	res.json(dateObj);
});

// Server listens port 3000
app.listen(3000, () => {
	// eslint-disable-next-line no-console
	console.log("Ready");
});
