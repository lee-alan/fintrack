const executeQuery = require('../utilities/mongoConnect').executeQuery;
const db = "fintrack";
const users_collection = "users";
const tokens_collection = "tokens";


exports.add_user = async (username, email, password, salt) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).insertOne(
        {username: username, email: email, password: password, salt: salt}));
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

exports.update_password = async (username, password, salt) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {password: password, salt: salt}}));
};

exports.update_salary = async (username, salary) => {
    return await executeQuery(db, async (db) => await db.collection(users_collection).updateOne(
        {username: username}, {$set: {salary: salary}}));
};

exports.save_token = async (username, token) => {
    await executeQuery(db, async (db) => await db.collection(tokens_collection).createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } ));
    return await executeQuery(db, async (db) => await db.collection(tokens_collection).updateOne(
        {username: username}, {$set: {token: token,  createdAt: new Date()}}, {upsert: true}));
};

exports.get_token = async (username) => {
    return await executeQuery(db, async (db) => await db.collection(tokens_collection).findOne(
        {username: username}));
};