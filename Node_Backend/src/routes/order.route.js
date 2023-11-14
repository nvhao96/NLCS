const express = require('express');

const orders = require('../app/controllers/OrderController');

const router = express.Router();

router.route('/:idorder')
    .get(orders.findOneOrder)
    .put(orders.updateOrder);


router.route('/')
    .get(orders.getAllOrders)
    .post(orders.createOrder);




module.exports = router;
