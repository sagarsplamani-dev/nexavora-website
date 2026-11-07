import DemoBooking from '../models/DemoBooking.js';
import mongoose from 'mongoose';
import validator from 'validator';
import { sendMail } from '../utils/mailer.js';

export const createDemoBooking = async (req, res) => {
  try {
    const { name, email, phone, course, preferredDate, preferredTime, learningMode, message, website } = req.body || {};
    if (website) return res.status(202).json({ message: 'Request received.' });
    if (![name, email, phone, course, preferredDate, preferredTime, learningMode].every((value) => typeof value === 'string' && value.trim())) {
      return res.status(400).json({ error: 'All fields except message are required.' });
    }
    if (!['Data Science', 'Data Analytics'].includes(course)) return res.status(400).json({ error: 'Choose Data Science or Data Analytics.' });
    if (name.length > 80 || !validator.isEmail(email) || email.length > 254) return res.status(400).json({ error: 'Enter valid name and email details.' });
    const normalizedPhone = validator.whitelist(phone, '0-9').slice(-10);
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return res.status(400).json({ error: 'Invalid Indian phone number.' });
    }
    const parsedDate = new Date(`${preferredDate}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(parsedDate.getTime()) || parsedDate < today) return res.status(400).json({ error: 'Choose a valid date that is not in the past.' });
    const allowedTimes = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];
    if (!allowedTimes.includes(preferredTime) || !['Online', 'Classroom'].includes(learningMode)) return res.status(400).json({ error: 'Choose a valid time and learning mode.' });
    if (typeof message !== 'undefined' && typeof message !== 'string') return res.status(400).json({ error: 'Invalid message.' });
    const sanitized = {
      name: validator.trim(validator.stripLow(name)).slice(0, 80),
      email: validator.normalizeEmail(email),
      phone: normalizedPhone,
      course,
      preferredDate: parsedDate,
      preferredTime,
      learningMode,
      message: message ? validator.trim(validator.stripLow(message)).slice(0, 500) : '',
    };
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Demo bookings are unavailable because the database is not connected.' });
    }
    const booking = new DemoBooking(sanitized);
    await booking.save();
    const safeName = validator.escape(sanitized.name);
    const results = await Promise.allSettled([
      sendMail({ to: process.env.ADMIN_EMAIL, subject: `New ${sanitized.course} demo request`, text: `A new ${sanitized.course} demo request was received.`, html: `<p>New demo request</p><p>Name: ${safeName}<br>Course: ${sanitized.course}<br>Date: ${sanitized.preferredDate.toISOString().slice(0, 10)}<br>Time: ${sanitized.preferredTime}<br>Mode: ${sanitized.learningMode}</p>` }),
      sendMail({ to: sanitized.email, subject: 'We received your demo request', text: 'We received your preferred demo time and will follow up to confirm availability.', html: '<p>We received your preferred demo time and will follow up to confirm availability.</p>' }),
    ]);
    if (results.some((result) => result.status === 'rejected' || result.value === false)) console.warn('Demo email delivery was incomplete.');
    res.status(201).json({ message: 'Demo request submitted successfully.' });
  } catch (err) {
    console.error('Demo submission failed:', err.name || 'UnknownError');
    res.status(500).json({ error: 'Unable to save your request. Please try again.' });
  }
};
