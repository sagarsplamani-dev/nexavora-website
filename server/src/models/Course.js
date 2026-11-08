import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  duration: { type: String, default: '' },
  curriculum: { type: [String], default: [] },
  skills: { type: [String], default: [] },
  published: { type: Boolean, default: false, index: true },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
