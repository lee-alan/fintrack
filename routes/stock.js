/*  jshint esversion: 6  */

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require("cors");
const axios = require("axios").default;
const app = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const {
    applyValidationRules,
    validate
} = require("../utilities/inputValidator");


//app.use(cors()); limit cors to frontend only later

/**
Init Mongodb
Admin Credentials: Alan_C09, mongodb1
*/
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Alan_C09:mongodb1@cluster0-jfjzg.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
Init Alphavantage
Alphavantage API Key : 2A83RBS24CKPREWG
*/
let API_KEY = "2A83RBS24CKPREWG";
const alpha = require('alphavantage')({ key: API_KEY });

/**
Init WorldTradingData
WorldTradingData API Key : cQZoKjrCeM438kbgIcDO2pdPz34L7HhIhOLrI002332JrsnlzcbrLXDeycit
*/
let WTD_API_KEY = "cQZoKjrCeM438kbgIcDO2pdPz34L7HhIhOLrI002332JrsnlzcbrLXDeycit";

// add user authentication later -> can remove :username params from most functions, replace with isAuthenticated + 
/*
app.use(function (req, res, next){
    req.username = req.session.username;
    console.log("HTTP request", req.session, req.method, req.url, req.body);
    next();
});
*/

// fetch all ticker symbols for given user
app.get("/getTickers/:username/", function (req, res) {
    let username = req.params.username;
    console.log(username);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    client.connect(function(err) {
		if (err) return res.status(500).end(err);
		
		const db = client.db("fintrack");
		db.collection("users").find({username: username }, {projection: {_id:0, tickers:1} }).toArray(function (err, result) {
            if (err) return res.status(500).end(err);
            if (!result) return res.json("no tickers");
            console.log(result);
            client.close();
			return res.json(result);
		});
	});
});

// fetch time_series_daily data for given ticker symbol
app.get("/daily/:ticker/", function (req, res) {
    let ticker = req.params.ticker;
	alpha.data.daily(ticker, outputsize="compact").then(data => {
        //console.log(data);
        return res.json(data);
    });
});

// fetch batch time_series_daily data for given ticker symbols "a,b,c"
app.get("/daily/batch/:tickers/", function (req, res) {
    let tickers = req.params.tickers;
    console.log(tickers);
	axios.get('https://api.worldtradingdata.com/api/v1/stock?symbol=' + tickers + '&api_token=' + WTD_API_KEY).then(response => {
		console.log(response.data);
		return res.json(response.data);
    });
});

// add a ticker for a user
app.post("/addticker/:username/:ticker/", function (req, res) {
    let username = req.params.username;
    let ticker = req.params.ticker;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(function(err) {
        if (err) return res.status(500).end(err);
        
        const db = client.db("fintrack");
        db.collection("users").update({username: username}, {$addToSet: {tickers: ticker} }, function(err, response) {
            if (err) return res.status(500).end(err);
            console.log("1 ticker added");
            client.close();
            return res.json(response);
        });
    }); 
});

// remove a ticker for a user
app.delete("/removeticker/:ticker/:username/", function (req, res) {
    let username = req.params.username;
    let ticker = req.params.ticker;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(function(err) {
        if (err) return res.status(500).end(err);
        
        const db = client.db("fintrack");
        db.collection("users").update({username: username}, {$pull: { tickers: ticker} }, function(err, response) {
            if (err) return res.status(500).end(err);
            console.log("1 ticker deleted");
            client.close();
            return res.json(response);
        });
    }); 
});

//export the router
module.exports = app;