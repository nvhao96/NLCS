const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

// Get cart by user ID
router.get('/:userId', cartController.getCartByUserId);

// Add item to cart
router.post('/', cartController.addItemToCart);

// Remove item from cart
router.delete('/', cartController.removeItemFromCart);

module.exports = router;