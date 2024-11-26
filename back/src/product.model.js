const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  code: {type: String},
  name: {type: String},
  description: {type: String},
  image: {type: String},
  category: {type: String},
  price: {type: Number},
  quantity: {type: Number},
  internalReference: {type: String},
  shellId: {type: Number},
  inventoryStatus: {
    type: String,
    enum: ["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"],
  },
  rating: {type: Number},
  createdAt: {type: Number},
  updatedAt: {type: Number},
});

module.exports = mongoose.model("Product", ProductSchema);