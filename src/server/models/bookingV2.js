const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    customerId: String,
    customerEmail: String,
    date: String,
    time: String,
    tables: [String],
    status: String
});

module.exports = mongoose.model('bookingV2', bookingSchema, 'BookingV2');