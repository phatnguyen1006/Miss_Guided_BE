const express = require("express");
const app = express();
const connectDB = require("./config/db-connect");
connectDB();

// Lib
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config(); // to use .env file
const PORT = process.env.PORT || 4000;

// pipe
const pipe = require("./pipeline/pipeline.js");

// Routes
const authenticationRoute = require('./routes/authentication.route');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIMEOUT) || 60000000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pipe', pipe);

app.get('/', (req, res, next) => {
    res.status(200).json({message: "Connected..."});
});

app.use('/me', authenticationRoute);

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});