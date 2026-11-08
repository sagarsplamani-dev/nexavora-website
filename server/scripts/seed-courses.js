import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Course from '../src/models/Course.js';
import { defaultCourses as courses } from '../src/utils/defaultCourses.js';

dotenv.config({ path: process.env.ENV_FILE || './.env' });

try {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required to seed courses.');
  await mongoose.connect(process.env.MONGO_URI);
  for (const course of courses) {
    await Course.updateOne({ slug: course.slug }, { $setOnInsert: course }, { upsert: true });
  }
  console.log('Course seed completed without overwriting existing records.');
} finally {
  await mongoose.disconnect();
}
