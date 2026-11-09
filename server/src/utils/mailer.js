import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
};

export const sendMail = async ({ to, subject, html, text }) => {
  const mailTransport = getTransporter();
  if (!mailTransport || !to) {
    console.warn('Email not sent: SMTP configuration or recipient is missing.');
    return false;
  }
  try {
    await mailTransport.sendMail({
      from: `Nexavora Technologies LLP <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });
    console.log('Email sent successfully.');
    return true;
  } catch (err) {
    console.error('Email delivery failed:', err.code || 'SMTPError');
    return false;
  }
};
