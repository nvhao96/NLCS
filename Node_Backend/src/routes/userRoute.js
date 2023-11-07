const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const app = require('../index');

router.use('/', UserController.getAllUsers);

router.get('/login', UserController.showLoginForm);
router.post('/login', UserController.loginUser);
router.get('/logout', UserController.logoutUser);

module.exports = router;