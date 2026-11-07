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
  if (!mailTransport || !process.env.ADMIN_EMAIL || !to) return false;
  try {
    await mailTransport.sendMail({
      from: `Nexavora Technologies LLP <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
      text,
    });
    return true;
  } catch (err) {
    console.error('Email delivery failed:', err.code || 'SMTPError');
    return false;
  }
};
