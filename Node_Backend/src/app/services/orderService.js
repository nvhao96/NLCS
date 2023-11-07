const Order = require('../models/orderModel');
const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("order");
    }
    extractOrderData(payload) {
        const order = {
            customerName: payload.customerName,
            productName: payload.productName,
            quantity: payload.quantity,
            totalPrice: payload.totalPrice,
            Date: payload.quantity,
        };
        // Remove undefined fields
        Objects.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }
    async createOrder(orderData) {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            throw error;
        }
    }


    async getOrders() {
        try {
            return await Order.find();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrderService;