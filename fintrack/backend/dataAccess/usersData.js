const executeQuery = require('../dataAccess/mongoConnect').executeQuery;
const db = "fintrack";
const users_collection = "users";

exports.add_user = async (username, email, password) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        {username: username, email: email, password: password}));
};

exports.user_signin = async (username, password) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username, password: password}));
};

exports.find_user_by_username = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).findOne(
        {username: username}));
};

exports.get_users = async () => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).find(
        {}).toArray());
};

exports.update_email = async (username, email) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {email: email}}));
};

exports.update_salary = async (username, salary) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {salary: salary}}));
};