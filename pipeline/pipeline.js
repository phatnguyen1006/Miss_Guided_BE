const express = require("express");
const router = express.Router();

require("dotenv").config();

const pipe = require("./pipelineFunction");

router.get("/", function (req, res) {
    res.render('pipeline', {

    });
});

router.post("/", pipe);

module.exports = router;