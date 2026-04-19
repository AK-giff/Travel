require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Lead = require("./models/Lead");
const Message = require("./models/Message");
const { sendMessage } = require("./services/whatsapp");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/lead", require("./routes/leadRoutes"));
app.use("/messages", require("./routes/messageRoutes"));

// SEND MESSAGE
app.post("/send-message", async (req, res) => {
  const { phone, message } = req.body;

  await sendMessage(phone, message);

  await Message.create({
    leadId: phone,
    message,
    sender: "agent"
  });

  res.sendStatus(200);
});

// WEBHOOK VERIFY
app.get("/webhook", (req, res) => {
  if (
    req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
  ) {
    return res.send(req.query["hub.challenge"]);
  }
  res.sendStatus(403);
});

// WEBHOOK RECEIVE
app.post("/webhook", async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (msg) {
    const from = msg.from;
    const text = msg.text?.body;

    let lead = await Lead.findOne({ phone: from });

    if (!lead) {
      lead = await Lead.create({
        phone: from,
        name: "Unknown"
      });
    }

    lead.lastInteraction = new Date();
    await lead.save();

    await Message.create({
      leadId: from,
      message: text,
      sender: "user"
    });

    await sendMessage(from, "Hi! How can I help with your travel plans? 😊");
  }

  res.sendStatus(200);
});

// FOLLOW-UP CRON (basic)
setInterval(async () => {
  const leads = await Lead.find();

  for (let lead of leads) {
    const hours = (Date.now() - lead.lastInteraction) / (1000 * 60 * 60);

    if (hours > 24) {
      await sendMessage(
       // lead.phone,
       // Hi! Just checking on your ${lead.destination || "trip"} 😊
      );
    }
  }
}, 3600000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on ${PORT}));
