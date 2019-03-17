const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const staffSchema = new Schema({
    email: String,
    password: String
});

module.exports = mongoose.model('staff', staffSchema, 'StaffCOL');