const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/:leadId", async (req, res) => {
  const messages = await Message.find({ leadId: req.params.leadId });
  res.json(messages);
});

module.exports = router;
