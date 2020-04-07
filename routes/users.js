const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cookie = require("cookie");
const nodemailer = require('nodemailer');


const {
  add_user,
  user_signin,
  get_users,
  find_user_by_username,
  update_email,
  update_salary,
  update_password,
  save_token
} = require("../dataAccess/usersData");

const {
  applyValidationRules,
  validate
} = require("../utilities/inputValidator");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//basic QA checkup
router.get("/", async function(req, res) {
  console.log("path /api/user/");

  res.status(200).send("/api/user/ in users controller");
});
//Signup
router.post(
  "/signup",
  applyValidationRules("/signup"),
  validate,
  async function(req, res) {
    console.log("path /api/user/signup/");
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    const exists = await find_user_by_username(username);
    if (exists) {
      return res
        .status(409)
        .json({ error: "User with this username already exists" });
    }
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    let saltedHash = hash.digest("base64");
    password = saltedHash;
    const user = await add_user(username, email, password, salt);

    if (user) {
      req.session.username = username;
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("username", username, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        })
      );
      return res
        .status(200)
        .json({ success: "user " + username + " signed up" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
);

//Signin
router.post(
  "/signin/first",
  applyValidationRules("/signin"),
  validate,
  async function(req, res) {
    console.log("path /api/user/signin/");
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    const user = await find_user_by_username(username);
    if (!user) {
      return res
        .status(409)
        .json({ error: "User with this username does not exist" });
    }
    let salt = user.salt;
    var hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    var saltedHash = hash.digest("base64");
    password = saltedHash;
    console.log(password, salt);
    if (user.password !== password)
      return res.status(401).json({ error: "access denied" });
    // // initialize cookie
    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("username", username, {
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7
    //   })
    // );
    // //session
    // req.session.username = username;

    const token = Math.floor(100000 + Math.random() * 900000);
    let token_process = await save_token(username, token);
    if(token_process && token_process.modifiedCount){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fintrack.team@gmail.com',
                pass: 'cscc09project'
            }
        });

        const mailOptions = {
            from: 'fintrack.team@gmail.com',
            to: `${user.email}`,
            subject: 'Your token for Fintrack app',
            text: `Hi ${username}, \n\n Thank you for coming back. ${token} is your token to login.\n\n All the best,\nFintrack support`
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.json({'error': error})
            } else {
                res.json({"success": 'Email sent: ' + info.response});
            }
        });
    }else{
        return res.json({ error: "Internal server error occurred while generating authentication token. Please try again later" });
    }
  }
);

router.post(
    "/signin/second",
    applyValidationRules("/signin"),
    validate,
    async function(req, res) {
        console.log("path /api/user/signin/");
        var username = req.body.username;
        var password = req.body.password;
        const token = req.body.token;
        // retrieve user from the database
        const user = await find_user_by_username(username);
        if (!user) {
            return res
                .status(409)
                .json({ error: "User with this username does not exist" });
        }
        let salt = user.salt;
        var hash = crypto.createHmac("sha512", salt);
        hash.update(password);
        var saltedHash = hash.digest("base64");
        password = saltedHash;
        console.log(password, salt);
        if (user.password !== password || user.token !== parseInt(token))
            return res.status(401).json({ error: "access denied" });
        // initialize cookie
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("username", username, {
                path: "/",
                maxAge: 60 * 60 * 24 * 7
            })
        );
        //session
        req.session.username = username;
        return res.json({ success: "user " + username + " signed in" });
    }
);

router.get("/isauthenticated", function(req, res) {
  if (req.session.username)
    return res.json({ isauth: true, username: req.session.username });
  return res.json({ isauth: false, username: null });
});

router.post("/signout", function(req, res) {
  console.log("path /api/user/signout/");
  req.session.destroy();
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    })
  );
  res.status(200).json({ success: "Signed out" });
});
//update Salary of a user
router.patch(
  "/profile/salary",
  applyValidationRules("/profile/salary"),
  validate,
  async function(req, res) {
    console.log("path /api/user/profile/salary");
    const salary = parseInt(req.body.salary);
    const result = await update_salary(req.body.username, salary);
    if (result && result.modifiedCount) {
      return res
        .status(200)
        .json({
          success: `Updated the salary of the user ${req.body.username}`
        });
    }
    return res.status(404).json({
      error: "User with the given username not found or the salary is the same"
    });
  }
);
//Update email of a user
router.patch(
  "/profile/email",
  applyValidationRules("/profile/email"),
  validate,
  async function(req, res) {
    console.log("path /api/user/profile/email");
    const result = await update_email(req.body.username, req.body.email);
    if (result && result.modifiedCount) {
      return res
        .status(200)
        .json({
          message: `Updated the email of the user ${req.body.username}`
        });
    }
    return res.status(404).json({
      error: "User with the given username not found or the email is the same"
    });
  }
);
//Update password of a user
router.patch("/profile/password",
    applyValidationRules("/profile/password"),
    validate,
    async function(req, res) {
  console.log("path /api/user/profile/password");
  //check old password
    const username = req.body.username;
    let old_password = req.body.old_password;
    const user = await find_user_by_username(username);
    if (!user) {
        return res
            .status(409)
            .json({ error: "User with this username does not exist" });
    }
    let salt = user.salt;
    let old_hash = crypto.createHmac("sha512", salt);
    old_hash.update(old_password);
    let saltedHash = old_hash.digest("base64");
    old_password = saltedHash;
    if (user.password !== old_password)
        return res.status(401).json({ error: " old passwords don't patch" });
    let new_password = req.body.new_password;
    let new_salt = crypto.randomBytes(16).toString("base64");
    let new_hash = crypto.createHmac("sha512", new_salt);
    new_hash.update(new_password);
    let new_saltedHash = new_hash.digest("base64");
    new_password = new_saltedHash;
    const result = await update_password(req.body.username, new_password, new_salt);
    if (result && result.modifiedCount) {
        return res
          .status(200)
          .json({ message: `Updated the password of the user ${req.body.username}` });
  }
  return res.status(404).json({
    error: "User with the given username not found or the new password is the same as the old one."
  });
});

//get user info by username

router.get('/info/:username', async function(req, res){
    let result = await find_user_by_username(req.params.username);
    if(result){
        delete result._id; delete result.password; delete result.salt; delete result.tickers;
        return res.status(200).json(result);
    }
    return res.status(404).json({
        error: "User with the given username not found."
    });
});

//export the router
module.exports = router;
