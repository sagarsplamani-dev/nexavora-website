import mongoose from 'mongoose';

const demoBookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  course: { type: String, enum: ['Data Science', 'Data Analytics'], required: true },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  learningMode: { type: String, enum: ['Online', 'Classroom'], required: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['new', 'confirmed', 'completed'], default: 'new' },
}, { timestamps: true });

export default mongoose.model('DemoBooking', demoBookingSchema);
