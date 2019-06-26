const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tableSchema = new Schema({
    tableNo: { type: String, required: true, unique: true },
    capacity: Number,
    availability: Object
});

module.exports = mongoose.model('table', tableSchema, 'Table');