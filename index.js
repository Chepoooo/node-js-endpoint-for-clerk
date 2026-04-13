const express = require("express");
const { Resend } = require("resend");

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/webhook", async (req, res) => {
  try {
    const event = req.body;

    console.log("📩 Clerk event received:", event.type);

    if (event.type === "user.created") {
      const email =
        event.data?.email_addresses?.[0]?.email_address;

      console.log("📤 Sending email via Resend...");

      await resend.emails.send({
        from: "Moja Alerts <onboarding@resend.dev>",
        to: [
          "luis@mojaai.com",
          "eric@mojaai.com",
          "max@mojaai.com"
        ],
        subject: "🔥 New Clerk User Created",
        text: `New user created:\n\nEmail: ${email}`,
      });

      console.log("📬 Email sent successfully!");
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});