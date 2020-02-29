const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//basic QA checkup
router.get('/', function (req, res) {
    console.log('path /user/');

    res.status(200).send('/ in users controller');
});
//Signup
router.post('/signup', function (req, res) {
    console.log('path /signup/');

    res.status(200).send('/signup in users controller');
});
//Signin
router.post('/signin', function (req, res) {
    console.log('path /signin/');

    res.status(200).send('/signin in users controller');
});
//Signout
router.post('/signout', function (req, res) {
    console.log('path /signout/');

    res.status(200).send('/signout in users controller');
});
//update Salary of a user
router.patch('/profile/salary', function (req, res) {
    console.log('path /profile/salary');

    res.status(200).send('/profile/salary in users controller');
});
//Update email of a user
router.patch('/profile/email', function (req, res) {
    console.log('path /profile/email');

    res.status(200).send('/profile/email in users controller');
});
//Update password of a user
router.patch('/profile/password', function (req, res) {
    console.log('path /profile/password');

    res.status(200).send('/profile/password in users controller');
});

//export the router
module.exports = router;