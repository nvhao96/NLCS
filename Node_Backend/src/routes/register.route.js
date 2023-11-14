const express = require('express');


const router = express.Router();


const registerController = require('../app/controllers/RegisterController');




router.route('/admin')
    .post(registerController.registerAdmin);


router.route('/')
    .post(registerController.register);




module.exports = router;