const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  qty: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  weight: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  images: {
    type: [String],
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
  },
  trending: {
    type: Boolean,
    default: false,
  },
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
