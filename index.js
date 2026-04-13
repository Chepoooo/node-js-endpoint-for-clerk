const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// EMAIL CONFIG (Gmail)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/webhook", async (req, res) => {
  try {
    const event = req.body;

    console.log("📩 Clerk event received:", event.type);

    // ONLY trigger on user.created
    if (event.type === "user.created") {
      const email = event.data?.email_addresses?.[0]?.email_address;

      await transporter.sendMail({
        from: "Moja Alerts <luis@mojaai.com>",
        to: "luis@mojaai.com",
        subject: "🔥 New Moja Customer Created",
        text: `New user created:\n\nEmail: ${email}`
      });

      console.log("📧 Email sent!");
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});