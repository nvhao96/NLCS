const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    productName: String,
    quantity: Number,
    totalPrice: Number,
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
