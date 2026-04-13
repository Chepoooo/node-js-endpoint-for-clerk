const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 👉 Replace with your Slack webhook later (optional)
const SLACK_WEBHOOK_URL = ""; 

app.post("/clerk-webhook", async (req, res) => {
    try {
        const event = req.body;

        console.log("Received event:", event.type);

        if (event.type === "user.created") {
            const email = event.data.email_addresses[0].email_address;

            console.log("✅ New user created:", email);

            // 👉 Slack notification (optional)
            if (SLACK_WEBHOOK_URL) {
                await axios.post(SLACK_WEBHOOK_URL, {
                    text: `🔥 New Moja customer: ${email}`
                });
            }
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log("🚀 Webhook running on http://localhost:3000");
});