const express = require('express');
const bodyParser = require('body-parser');
// const executeQuery = require('../dataAccess/mongoConnect').executeQuery;
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
    const exists = await find_user_by_username(req.body.username);
    if(exists){
        return res.send(400).json({"error": "User with this username already exists"});
    }
    const user = await add_user(req.body.username, req.body.email, req.body.password);
    if(user){
        res.status(200).json(user.ops);
    }else{
        res.status(500).json({error: "Internal server error"});
    }
});

//Signin
router.post('/signin', async function (req, res) {
    console.log('path /api/user/signin/');
    const user = await user_signin(req.body.username, req.body.password);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({"error": "User not found"});
    }
});
//Signout
router.post('/signout', function (req, res) {
    console.log('path /api/user/signout/');

    res.status(200).send('/api/user/signout in users controller');
});
//update Salary of a user
router.patch('/profile/salary', async function (req, res) {
    console.log('path /api/user/profile/salary');
    const salary = parseInt(req.body.salary);
    const result = await update_salary(req.body.username, salary);
    if(result && result.modifiedCount){
        return res.status(200).json({"message": `Updated the salary of the user ${req.body.username}`});
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