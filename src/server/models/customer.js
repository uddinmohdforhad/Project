const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    postCode: { type: String, required: true }
});

module.exports = mongoose.model('customer', customerSchema, 'Customer');