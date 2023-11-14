const express = require('express');


const loginController = require('../app/controllers/LoginController');

const router = express.Router();



router.route('/admin')
    .post(loginController.loginAdmin);


router.route('/')
    .post(loginController.login);


module.exports = router;