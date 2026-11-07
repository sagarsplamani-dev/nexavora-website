import ContactMessage from '../models/ContactMessage.js';
import mongoose from 'mongoose';
import validator from 'validator';
import { sendMail } from '../utils/mailer.js';

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, website } = req.body || {};
    if (website) return res.status(202).json({ message: 'Request received.' });
    if (![name, email, subject, message].every((value) => typeof value === 'string' && value.trim())) return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
    if (name.length > 80 || subject.length > 120 || message.length > 2000 || !validator.isEmail(email) || email.length > 254) return res.status(400).json({ error: 'Please enter valid contact details.' });
    if (phone && (typeof phone !== 'string' || phone.length > 30)) return res.status(400).json({ error: 'Invalid phone number.' });
    const sanitized = {
      name: validator.trim(validator.stripLow(name)).slice(0, 80),
      email: validator.normalizeEmail(email),
      phone: phone ? validator.whitelist(phone, '+0-9').slice(0, 16) : '',
      subject: validator.trim(validator.stripLow(subject)).slice(0, 120),
      message: validator.trim(validator.stripLow(message)).slice(0, 2000),
    };
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Contact messages are unavailable because the database is not connected.' });
    }
    const contact = new ContactMessage(sanitized);
    await contact.save();
    const safeName = validator.escape(sanitized.name);
    const safeSubject = validator.escape(sanitized.subject);
    const safeMessage = validator.escape(sanitized.message);
    const results = await Promise.allSettled([
      sendMail({ to: process.env.ADMIN_EMAIL, subject: 'New website contact message', text: `A new contact message was received: ${sanitized.subject}`, html: `<p>New contact message: ${safeSubject}</p><p>Name: ${safeName}</p><p>${safeMessage}</p>` }),
      sendMail({ to: sanitized.email, subject: 'We received your message', text: 'Thank you for contacting us. The team will get back to you soon.', html: '<p>Thank you for contacting us. The team will get back to you soon.</p>' }),
    ]);
    if (results.some((result) => result.status === 'rejected' || result.value === false)) console.warn('Contact email delivery was incomplete.');
    res.status(201).json({ message: 'Message submitted successfully.' });
  } catch (err) {
    console.error('Contact submission failed:', err.name || 'UnknownError');
    res.status(500).json({ error: 'Unable to save your message. Please try again.' });
  }
};
