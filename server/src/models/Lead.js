import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  pinCode: { type: String, default: '' },
  course: { type: String, required: true },
  message: { type: String, default: '' },
  source: { type: String, default: 'course-page' },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
