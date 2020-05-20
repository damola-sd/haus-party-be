const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
      type: Number,
      required: true
  }, 
  images: [{
      type: String
  }]
});


export const Product = mongoose.model('Product', productSchema);