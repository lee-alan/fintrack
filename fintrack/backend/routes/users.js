const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookie = require('cookie');

const {add_user, user_signin, get_users, find_user_by_username, update_email, update_salary} = require("../dataAccess/usersData");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//basic QA checkup
router.get('/', async function (req, res) {
    console.log('path /api/user/');

    res.status(200).send('/api/user/ in users controller');
});
//Signup
router.post('/signup', async function (req, res) {
    console.log('path /api/user/signup/');
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    const exists = await find_user_by_username(username);
    if(exists){
        return res.status(409).json({"error": "User with this username already exists"});
    }
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let saltedHash = hash.digest('base64');
    password = saltedHash;
    const user = await add_user(username, email, password, salt);

    if(user) {
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            path : '/',
            maxAge: 60 * 60 * 24 * 7
        }));
        return res.status(200).json({success: "user " + username + " signed up"});
    }
        return res.status(500).json({error: "Internal server error"});
});

//Signin
router.post('/signin', async function (req, res) {
    console.log('path /api/user/signin/');
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    const user = await find_user_by_username(username);
    if(!user){
        return res.status(409).json({"error": "User with this username does not exist"});
    }
        let salt = user.salt;
        var hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        var saltedHash = hash.digest('base64');
        password = saltedHash;
        if (user.password !== password) return res.status(401).end("access denied");
        // initialize cookie
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            path : '/',
            maxAge: 60 * 60 * 24 * 7
        }));
        //session
        req.session.username = username;
        return res.json({success: "user " + username + " signed in"});
});
//Signout
router.post('/signout', function (req, res) {
    console.log('path /api/user/signout/');
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path : '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    res.status(200).json({success: "Signed out"});
});
//update Salary of a user
router.patch('/profile/salary', async function (req, res) {
    console.log('path /api/user/profile/salary');
    const salary = parseInt(req.body.salary);
    const result = await update_salary(req.body.username, salary);
    if(result && result.modifiedCount){
        return res.status(200).json({"success": `Updated the salary of the user ${req.body.username}`});
    }
    return res.status(404).json({"error": "User with the given username not found or the salary is the same"});
});
//Update email of a user
router.patch('/profile/email', async function (req, res) {
    console.log('path /api/user/profile/email');
    const result = await update_email(req.body.username, req.body.email);
    if(result && result.modifiedCount){
        return res.status(200).json({"message": `Updated the email of the user ${req.body.username}`});
    }
    return res.status(404).json({"error": "User with the given username not found or the email is the same"});

});
//Update password of a user
router.patch('/profile/password', async function (req, res) {
    console.log('path /api/user/profile/password');
    const password = req.body.password;
    const result = await update_email(req.body.username, password);
    if(result && result.modifiedCount){
        return res.status(200).json({"message": `Updated the email of the user ${req.body.username}`});
    }
    return res.status(404).json({"error": "User with the given username not found or the password is the same"});
});

//export the router
module.exports = router;