const express = require('express');

const users = require('../app/controllers/UserController');
const router = express.Router();

router.route('/admin/')
    .get(users.getAllAdmins);

router.route('/')
    .get(users.getAllUsers);

router.route('/:id')
    .get(users.findOneUser)
    .put(users.updateUser);

module.exports = router;