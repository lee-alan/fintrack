const executeQuery = require('../dataAccess/mongoConnect').executeQuery;
const db = "fintrack";
const expenses_collection = "expenses";
ObjectId = require('mongodb').ObjectID;


exports.add_expense = async (expense) => {
    console.log(expense);
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).insertOne(
        expense));
};

exports.get_expense_by_id = async (id) => {
    const _id = ObjectId(id);
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).findOne(
        {_id: _id}));
};

exports.delete_expense = async (id) => {
    const _id = ObjectId(id);
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).deleteOne(
        {_id: _id}));
};

