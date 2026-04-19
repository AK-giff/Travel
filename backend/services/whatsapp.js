const axios = require("axios");

const sendMessage = async (phone, message) => {
  await axios.post(
    https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages,
    {
      messaging_product: "whatsapp",
      to: phone,
      text: { body: message }
    },
    {
      headers: {
        Authorization: Bearer ${process.env.WHATSAPP_TOKEN},
        "Content-Type": "application/json"
      }
    }
  );
};

module.exports = { sendMessage };
