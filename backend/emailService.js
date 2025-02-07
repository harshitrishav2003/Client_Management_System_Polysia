const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider, e.g., Gmail, Outlook, etc.
    auth: {
      user: 'harshitrishav987@gmail.com', // Replace with your email
      pass: 'Aashriya@123', // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: 'harshitrishav987@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

module.exports = sendEmail;
