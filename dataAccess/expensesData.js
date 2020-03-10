const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "fintrack";
const expenses_collection = "expenses";
ObjectId = require('mongodb').ObjectID;


exports.add_expense = async (expense) => {
    console.log(expense);
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).insertOne(
        expense));
};

exports.update_expense = async (expense_id, fields) => {
    const _id = ObjectId(expense_id);
    console.log(fields);
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).updateOne(
        {_id: _id}, {$set: fields}));
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

exports.get_expenses = async (page_number, page_limit, username, category, payment_type) => {
    const skips = (page_number - 1)*page_limit;
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).find(
        {username: username, payment_type: {$regex: payment_type}, category: {$regex:category}}).sort({date: -1}).skip(skips).limit(page_limit).toArray());
};

exports.get_expenses_sum = async (page_number, page_limit, username, category, payment_type) => {
    const skips = (page_number - 1)*page_limit;
    const array = await executeQuery(db, async (db) => await db.collection(expenses_collection).find(
        {username: username, payment_type: {$regex: payment_type}, category: {$regex:category}}).sort({date: -1}).skip(skips).limit(page_limit).toArray());
    let sum = 0;
    array.forEach(item => {sum = sum + item.amount});
    return sum;
};

exports.get_expenses_by_month = async (username, month, page_number, page_limit, category, payment_type) => {
    const skips = (page_number - 1)*page_limit;
    return await executeQuery(db, async (db) => await db.collection(expenses_collection).find(
        { "$expr": { "$eq": [{ "$month": new Date() }, month] }, username: username, payment_type: {$regex: payment_type}, category: {$regex:category}}).sort({date: -1}).skip(skips).limit(page_limit).toArray());
};

exports.get_expenses_sum_month = async (username, month, page_number, page_limit, category, payment_type) => {
    const skips = (page_number - 1)*page_limit;
    let array = await executeQuery(db, async (db) => await db.collection(expenses_collection).find(
        { "$expr": { "$eq": [{ "$month": new Date() }, month] }, username: username, payment_type: {$regex: payment_type}, category: {$regex:category}}).sort({date: -1}).skip(skips).limit(page_limit).toArray());
    let sum = 0;
    array.forEach(item => {sum = sum + item.amount});
    return sum;
};
