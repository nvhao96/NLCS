const express = require('express');

const products = require('../app/controllers/ProductController');

const router = express.Router();


router.route('/:id')
    .get(products.findOneProduct)
    .put(products.updateProduct)
    .delete(products.deleteProduct);

router.route('/category/:categoryname/:product')
    .get(products.findProductByCategory);

router.route('/search')
    .post(products.searchProduct);




router.route('/')
    .get(products.getAllProducts)
    .post(products.createProduct);


module.exports = router;