const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send", async (req, res) => {
 const { message } = req.body;
 try {
   await axios.post("https://lovedeep1.app.n8n.cloud/webhook/f0989e8a-3133-4e64-9c75-67b407904626",{ message });
   res.json({ status: "Message sent", data: { message } });
 } catch (err) {
   console.error("❌ Failed to send to n8n:", err.message);
   console.error("Full error:", err.response?.data || err);
   res.status(500).json({ error: "n8n POST failed" });
 }
});

app.get("/all-messages", async (req, res) => {
 try {
   const response = await axios.get("https://lovedeep1.app.n8n.cloud/webhook/b0b00692-fcd0-494a-85f2-32fa78e0e33c");
   res.json({ messages: response.data });
 } catch (err) {
   console.error("❌ Failed to fetch messages:", err.message);
   res.status(500).json({ error: "n8n GET failed" });
 }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`🚀 Server running at http://localhost:${PORT}`);
});
