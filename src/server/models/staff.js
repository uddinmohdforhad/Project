const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const staffSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: Boolean,
    information: {
        age: Number,
    }
});

module.exports = mongoose.model('staff', staffSchema, 'Staff');