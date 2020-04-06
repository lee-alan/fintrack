const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const {get_news} = require("../dataAccess/newsData");

//create a new expense
router.get('/', async function (req, res) {
    console.log('Get path /news/');
    return res.send(await get_news());
});

//export the router
module.exports = router;
