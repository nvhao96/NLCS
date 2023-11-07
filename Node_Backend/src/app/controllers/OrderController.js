const orderService = require('../services/orderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const order = await orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Error creating order' });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await orderService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching orders' });
        }
    }
}

module.exports = new OrderController();
