const express = require("express");
const router = express.Router();

require("dotenv").config();

const pipe = require("./pipelineFunction");

router.get("/", function (req, res) {
    res.render('pipeline', {
        "message": "Welcome to MissGuided Server"
    });
});

router.post("/", pipe);

module.exports = router;