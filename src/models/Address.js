const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const addressSchema = new Schema({
    address: {
        type: String,
        required: true, 
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
})