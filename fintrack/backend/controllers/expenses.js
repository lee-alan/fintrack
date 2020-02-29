const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//basic QA checkup
router.get('/', function (req, res) {
    console.log('GET path /api/expense/');

    res.status(200).send('GET in path /api/expense in expenses controller');
});

//create a new expense
router.post('/', function (req, res) {
    console.log('POST path /expense/');

    res.status(200).send(' POST in path api/expense/ in expenses controller');
});
//retrieve the expense by id
router.get('/:id', function (req, res) {
    console.log('GET path /api/expense/:id');

    res.status(200).send(' POST in path /api/expense/:id in expenses controller');
});

// retrieve the expenses from page*limit to page*limit +1
router.get('/multiple', function (req, res) {
    console.log('GET path /api/expense/multiple');

    res.status(200).send(' GET in path /api/expense/multiple in expenses controller');
});

//retrieve the expenses from page*limit to page*limit +1 in specific month
router.get('/multiple/:month', function (req, res) {
    console.log('GET path /api/expense/multiple/:month');

    res.status(200).send(' GET in path /api/expense/multiple/:month in expenses controller');
});

// delete the expense by id and all assosiated comments
router.delete('/:id', function (req, res) {
    console.log('DELETE path /api/expense/:id');

    res.status(200).send(' DELETE in path /api/expense/:id in expenses controller');
});

//export the router
module.exports = router;
