const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema (
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        },
        amountPaid: {
            type: Number
        },
        paymentConfirmed: {
            type: Boolean,
            default: false
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        cardUsed: {
            type: Schema.Types.ObjectId,
            ref: 'Card'
        } 


    }
);


export const Transaction = mongoose.model('Transaction', transactionSchema);