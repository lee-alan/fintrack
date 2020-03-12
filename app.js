let express = require('express');
let app = express();
let users = require('./routes/users.js');
let expenses = require('./routes/expenses.js');
const PORT = process.env.PORT || 5000;

const session = require('express-session');

app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static('./fintrack/frontend/build'));


app.use('/api/user', users);
app.use('/api/expense', expenses);

// to catch any other path and return 404
app.use(function (req, res) {
    res.status(404).send("Sorry can't find that in Fintrack api!")
});

app.listen(PORT, () => console.log('Start listening on port 5000!'));
