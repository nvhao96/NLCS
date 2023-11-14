const express = require('express');

const products = require('../app/controllers/ProductController');

const router = express.Router();

router.route('/')
    .get(products.findProductByNotes);

module.exports = router;