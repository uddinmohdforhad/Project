const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const orderSchema = new Schema({
    customerId: String,
    bookingId: String,
    orderList: [],
    totalPayment: String 
});

module.exports = mongoose.model('order', orderSchema, 'Order');