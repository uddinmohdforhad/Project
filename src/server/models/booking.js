const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    customerId: String,
    customerEmail: String,
    date: String,
    capacity: String 
});

module.exports = mongoose.model('booking', bookingSchema, 'Booking');