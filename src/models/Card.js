const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
       card_name: {
           type: String,
           required: true
       }, 
       card_number: {
           type: String,
           required: true
       },
       cvv: {
           type: String, 
           required: true
       }, 
       owner: {
           type: Schema.Types.ObjectId,
           ref: 'User'
       }
    }
);

export const Card = mongoose.model('Card', cardSchema);