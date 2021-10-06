const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/registerUser', userController.postRegister);

router.post('/loginUser', userController.postLogin);

module.exports = router;