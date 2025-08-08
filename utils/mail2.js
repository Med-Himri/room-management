const { text } = require("express");
const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: Number(process.env.SMTP_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      text: text
    });

    console.log("✅ Message sent:");
  } catch (error) {
    console.error("❌ Error sending email:");
    console.log(error);
  }
};

module.exports = sendEmail;

// Test it
if (require.main === module) {
  sendEmail(
    "your_email@example.com", // <- your real email here
    "✅ Test Email",
    "<h1>This is a test email from Nodemailer + Brevo</h1>"
  );
}
