const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.get("/", async (req, res) => {
  const leads = await Lead.find().sort({ lastInteraction: -1 });
  res.json(leads);
});

router.post("/", async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
});

router.put("/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
});

module.exports = router;
