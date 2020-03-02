const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
const {add_expense, get_expense_by_id, delete_expense} = require("../dataAccess/expensesData");

//create a new expense
router.post('/', async function (req, res) {
    console.log('POST path /expense/');
    const expense = {
        username: req.body.username,
        type: req.body.type,
        amount: parseInt(req.body.amount),
        date: new Date(),
        payment_type: req.body.payment_type,
        description: req.body.description
    };
    const result = await add_expense(expense);
    if(result) {
        return res.status(200).json(result.ops[0]);
    }
    return res.status(500).json({error: "Internal server error"});
});
//retrieve the expense by id
router.get('/', async function (req, res) {
    console.log('GET path /api/expense/:id');
    const expense = await get_expense_by_id(req.query.id);
    if(expense){
        return res.status(200).json(expense);
    }
    return res.status(404).json({error:`An expense with id ${req.query.id} not found`});
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

// delete the expense by id and all associated comments
router.delete('/', async function (req, res) {
    console.log('DELETE path /api/expense/:id');
    const result = await delete_expense(req.query.id);
    if(result.deletedCount){
        res.status(200).send({success: `expense with id: ${req.query.id} has been deleted!`});
    }
    res.status(404).send({error: `expense with id: ${req.query.id} not found!`});
});

//export the router
module.exports = router;
