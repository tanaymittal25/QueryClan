const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const qaRoute = require('./routes/question');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var dbUrl = "mongodb://127.0.0.1:27017/QueryClan";

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
    if (err) throw err;
    console.log('Connected to DB');
});

app.use(authRoute);
app.use(qaRoute);
app.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server running on port 3000');
});


