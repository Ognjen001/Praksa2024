const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String },
  is_admin: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  title: { type: String, default: "prof"},
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profesor", userSchema);
