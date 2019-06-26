const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tableSchema = new Schema({
    tableNo: { type: String, required: true, unique: true },
    capacity: Number,
    availability: { 
        five_six: { type: Boolean, default: true },
        six_seven: { type: Boolean, default: true }, 
        seven_eight: { type: Boolean, default: true }, 
        eight_nine: { type: Boolean, default: true }, 
        nine_ten: { type: Boolean, default: true }, 
        ten_eleven: { type: Boolean, default: true }
    }
});

module.exports = mongoose.model('table', tableSchema, 'Table');