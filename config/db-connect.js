//connect to database
const mongoose = require('mongoose');
require('dotenv').config();


//create a connection to database
function connectDB() {

    //options to connect without error
    const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }; 

    mongoose.connect(process.env.dbURL, mongooseOptions, (err) => {
        if (err) {
            console.log("Connect to database error", err)
        } else {
            console.log("Connect to database successfully");
        }
    });
}

module.exports = connectDB;