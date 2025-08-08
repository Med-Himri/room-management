const nodemailer = require("nodemailer");

// Create transporter for sending emails using Brevo SMTP

// Function to send an email for password reset
const sendEmailToPassword = (id, code, firstName, email) => {
  const htmlContent = ` <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f6f6f6; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
      h1 { font-size: 24px; margin-bottom: 20px; color: #02072C; }
      p { font-size: 18px; color: #02072C; line-height: 30px; }
      .btn { display: inline-block; background-color: #3C82C1; color: #ffffff !important; text-decoration: none; padding: 15px 17px; border-radius: 10px; font-size: 16px; width: 60%; font-weight: 600; }
      .btn:hover { background-color: #3c83c1e7; }
      .footer p { margin-top: 15px; font-size: 14px; color: #717070; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>reset password </h1>
      <p>Hi ${firstName}, you're almost ready to get started. Please click below to verify your account!</p>
      <a href="http://localhost:5000/api/user/forgot-password/${id}/${code}" class="btn">reset password</a>
      <div class="footer">
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    </div>
  </body>
</html>
`;

  const mailOptions = {
    from: "himrimohamed20@gmail.com",
    to: email,
    subject: "Forgot Password",
    text: `Hello ${firstName}`,
    html: htmlContent,
  };

  // Send email using transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

// Function to send an email
const sendEmailToUser = (id, code, firstName, email) => {
  // HTML content with dynamic data
  const htmlContent = ` <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f6f6f6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
            h1 { font-size: 24px; margin-bottom: 20px; color: #02072C; }
            p { font-size: 18px; color: #02072C; line-height: 30px; }
            .btn { display: inline-block; background-color: #3C82C1; color: #ffffff !important; text-decoration: none; padding: 15px 17px; border-radius: 10px; font-size: 16px; width: 60%; font-weight: 600; }
            .btn:hover { background-color: #3c83c1e7; }
            .footer p { margin-top: 15px; font-size: 14px; color: #717070; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verification</h1>
            <p>Hi ${firstName}, you're almost ready to get started. Please click below to verify your account!</p>
            <a href="http://localhost:5000/api/user/verify-email/${id}/${code}" class="btn">Verify your Account</a>
            <div class="footer">
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  const mailOptions = {
    from: "himrimohamed20@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Hello ${firstName}`,
    html: htmlContent,
  };

  // Send email using transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

const sendEmailToName = (id, code, firstName, email) => {
  const htmlContent = ` 
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Name Change Verification</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f6f6f6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
          h1 { font-size: 24px; margin-bottom: 20px; color: #02072C; }
          p { font-size: 18px; color: #02072C; line-height: 30px; }
          .btn { display: inline-block; background-color: #3C82C1; color: #ffffff !important; text-decoration: none; padding: 15px 17px; border-radius: 10px; font-size: 16px; width: 60%; font-weight: 600; }
          .btn:hover { background-color: #3c83c1e7; }
          .footer p { margin-top: 15px; font-size: 14px; color: #717070; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Name Change Request</h1>
          <p>Hi ${firstName}, you're almost ready to change your name. Please click below to verify the change!</p>
          <a href="http://localhost:5000/api/user/verify-name-change/${id}/${code}" class="btn">Verify Name Change</a>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  const mailOptions = {
    from: "himrimohamed20@gmail.com",
    to: email,
    subject: "Name Change",
    text: `Hello ${firstName}`,
    html: htmlContent,
  };

  // Send email using transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

const sendEmailToEmail = (id, code, firstName, email) => {
  const htmlContent = ` 
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Change Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f6f6f6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
          h1 { font-size: 24px; margin-bottom: 20px; color: #02072C; }
          p { font-size: 18px; color: #02072C; line-height: 30px; }
          .btn { display: inline-block; background-color: #3C82C1; color: #ffffff !important; text-decoration: none; padding: 15px 17px; border-radius: 10px; font-size: 16px; width: 60%; font-weight: 600; }
          .btn:hover { background-color: #3c83c1e7; }
          .footer p { margin-top: 15px; font-size: 14px; color: #717070; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Email Change Request</h1>
          <p>Hi ${firstName}, you're almost ready to change your email address. Please click below to verify and confirm the change!</p>
          <a href="http://localhost:5000/api/user/verify-email-change/${id}/${code}" class="btn">Verify Email Change</a>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  const mailOptions = {
    from: "himrimohamed20@gmail.com",
    to: email,
    subject: "Email Change ",
    text: `Hello ${firstName}`,
    html: htmlContent,
  };

  // Send email using transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info);
    }
  });
};

const sendBookingReminderEmail = (clientName, email, serviceType, dateTime) => {
  const htmlContent = `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Reminder</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f6f6f6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); text-align: center; }
          h1 { font-size: 24px; margin-bottom: 20px; color: #02072C; }
          p { font-size: 18px; color: #02072C; line-height: 30px; }
          .footer p { margin-top: 20px; font-size: 14px; color: #717070; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Upcoming Booking Reminder</h1>
          <p>Hi ${clientName},</p>
          <p>This is a friendly reminder for your upcoming booking:</p>
          <p><strong>Service:</strong> ${serviceType}<br>
          <strong>Date:</strong> ${dateTime}</p>
          <p>Please make sure to be available on time. If you need to make changes, contact us in advance.</p>
          <div class="footer">
            <p>Thank you for choosing us. We look forward to seeing you!</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: "himrimohamed20@gmail.com",
    to: email,
    subject: "Booking Reminder – Don’t Miss Your Appointment!",
    text: `Hi ${clientName}, this is a reminder about your booking for ${serviceType} on ${dateTime}.`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending booking reminder email:", error);
    } else {
      console.log("Booking reminder email sent successfully:", info.response);
    }
  });
};

module.exports = {
  sendEmailToPassword,
  sendEmailToEmail,
  sendEmailToName,
  sendEmailToUser,
  sendBookingReminderEmail,
};