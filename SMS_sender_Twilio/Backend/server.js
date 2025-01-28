const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Twilio } = require("twilio");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new Twilio(accountSid, authToken);

// Endpoint to send a message
app.post("/send-message", async (req, res) => {
  console.log("Request body:", req.body);

  const { to, message } = req.body;

  if (!to || !message) {
      return res.status(400).send({
          success: false,
          error: "Both 'to' and 'message' fields are required.",
      });
  }

  try {
      const messageResponse = await client.messages.create({
          body: message,
          from: twilioPhoneNumber,
          to: to,
      });

      res.status(200).send({
          success: true,
          messageSid: messageResponse.sid,
      });
  } catch (error) {
      console.error("Twilio error:", error);
      res.status(500).send({
          success: false,
          error: error.message,
      });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
console.log("Account SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("Auth Token:", process.env.TWILIO_AUTH_TOKEN);
console.log("Twilio Phone Number:", process.env.TWILIO_PHONE_NUMBER);
