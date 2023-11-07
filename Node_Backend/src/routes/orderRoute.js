const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

module.exports = router;
