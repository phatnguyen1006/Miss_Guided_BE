const express = require("express");
const app = express();
const connectDB = require("./config/db-connect");
connectDB();

// Lib
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const hbs = require("express-handlebars");

require("dotenv").config(); // to use .env file
const PORT = process.env.PORT || 4000;

// pipe
const pipeRoute = require("./pipeline/pipeline.js");

// template engine
app.engine("handlebars", hbs({ extname: ".hbs" })); //install view
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views")); // view

// Functions
const clearFunction = require("./functions/clearFaultProduct");

// Routes
const authenticationRoute = require("./routes/authentication.route");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIMEOUT) || 60000000 },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/pipe", pipeRoute);
// app.get("/clear", clearFunction);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Connected... Go to secret page!!!" });
});

app.use("/me", authenticationRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
