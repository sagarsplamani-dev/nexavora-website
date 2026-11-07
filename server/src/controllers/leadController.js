import Lead from '../models/Lead.js';
import mongoose from 'mongoose';
import validator from 'validator';
import { sendMail } from '../utils/mailer.js';

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, pinCode, course, message, website, submissionId } = req.body || {};
    if (website) return res.status(202).json({ message: 'Request received.' });
    if (![name, email, phone, course].every((value) => typeof value === 'string' && value.trim())) {
      return res.status(400).json({ error: 'Name, email, phone, and course are required.' });
    }
    if (name.length > 80 || !validator.isEmail(email) || email.length > 254) {
      return res.status(400).json({ error: 'Enter valid name and email details.' });
    }
    if (!['Data Science', 'Data Analytics'].includes(course)) return res.status(400).json({ error: 'Choose Data Science or Data Analytics.' });
    if (typeof message !== 'undefined' && (typeof message !== 'string' || message.length > 1000)) return res.status(400).json({ error: 'Message must be under 1000 characters.' });
    const normalizedPhone = validator.whitelist(phone, '0-9').slice(-10);
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({ error: 'Invalid Indian phone number.' });
    }
    if (pinCode && !validator.isPostalCode(pinCode, 'IN')) {
      return res.status(400).json({ error: 'Invalid PIN code.' });
    }
    if (submissionId && (typeof submissionId !== 'string' || !/^[a-zA-Z0-9-]{16,100}$/.test(submissionId))) {
      return res.status(400).json({ error: 'Invalid submission identifier.' });
    }
    const sanitized = {
      submissionId: submissionId || undefined,
      name: validator.trim(validator.stripLow(name)).slice(0, 80),
      email: validator.normalizeEmail(email),
      phone: normalizedPhone,
      pinCode: pinCode ? validator.whitelist(pinCode, '0-9') : '',
      course,
      message: message ? validator.trim(validator.stripLow(message)).slice(0, 1000) : '',
      source: 'course-page',
    };
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Course submissions are unavailable because the database is not connected.' });
    }
    const lead = new Lead(sanitized);
    try {
      await lead.save();
    } catch (error) {
      if (error?.code === 11000 && submissionId) {
        return res.status(200).json({ message: 'This request was already received.' });
      }
      throw error;
    }
    const safeName = validator.escape(sanitized.name);
    const safeCourse = validator.escape(sanitized.course);
    const safeMessage = validator.escape(sanitized.message);
    const results = await Promise.allSettled([
      sendMail({ to: process.env.ADMIN_EMAIL, subject: `New ${sanitized.course} enquiry`, text: `A new ${sanitized.course} enquiry was received.`, html: `<p>New course enquiry</p><p>Name: ${safeName}<br>Course: ${safeCourse}<br>Message: ${safeMessage}</p>` }),
      sendMail({ to: sanitized.email, subject: 'We received your course enquiry', text: 'Our course advisor will contact you soon.', html: '<p>Thank you for your interest. Our course advisor will contact you soon.</p>' }),
    ]);
    if (results.some((result) => result.status === 'rejected' || result.value === false)) console.warn('Lead email delivery was incomplete.');
    res.status(201).json({ message: 'Lead submitted successfully.' });
  } catch (err) {
    console.error('Lead submission failed:', err.name || 'UnknownError');
    res.status(500).json({ error: 'Unable to save your request. Please try again.' });
  }
};
