const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
  username: {type: String},
  firstname: {type: String},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  cart: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  interestsList: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  createdAt: {type: Number},
  updatedAt: {type: Number},
});

module.exports = mongoose.model("User", UserSchema);