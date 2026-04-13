const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

// EMAIL CONFIG (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "luis@mojaai.com",
    pass: "gdra ddvr hwkj plbg"
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const event = req.body;

    console.log("📩 Clerk event received:", event.type);

    // ONLY trigger on user.created
    if (event.type === "user.created") {
      const email = event.data?.email_addresses?.[0]?.email_address;

      await transporter.sendMail({
        from: "Moja Alerts <YOUR_EMAIL@gmail.com>",
        to: "YOUR_EMAIL@gmail.com",
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