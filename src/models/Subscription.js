const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    perks: [{
        type: String
    }],
    discount: {
        type: Number
    },

});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);