const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  destination: String,
  status: { type: String, default: "new" },
  lastInteraction: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lead", leadSchema);
