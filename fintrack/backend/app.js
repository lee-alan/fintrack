let express = require('express');
let app = express();
let users = require('./routes/users.js');
let expenses = require('./routes/expenses.js');

app.use('/api/user', users);
app.use('/api/expense', expenses);

// to catch any other path and return 404
app.use(function (req, res) {
    res.status(404).send("Sorry can't find that in Fintrack api!")
});

app.listen(3003, () => console.log('Start listening on port 3003!'));
