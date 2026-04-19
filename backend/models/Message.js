const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  leadId: String,
  message: String,
  sender: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
