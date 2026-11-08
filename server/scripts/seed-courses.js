import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Course from '../src/models/Course.js';

dotenv.config({ path: process.env.ENV_FILE || './.env' });

const courses = [
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    description: 'Build practical skills in data analysis, visualization and SQL to transform raw data into meaningful business insights.',
    duration: '16 weeks',
    curriculum: [
      'Excel for Data Analysis',
      'SQL & Database Management',
      'Python Programming',
      'NumPy & Pandas',
      'Statistics & Probability',
      'Data Visualization',
      'Power BI',
      'Tableau',
      'Machine Learning Fundamentals',
      'Capstone Projects',
      'Interview Preparation',
    ],
    skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Tableau', 'Statistics', 'Data Visualization'],
    published: true,
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    description: 'Build practical skills to turn data into clear, confident decisions through an applied Data Science learning path.',
    duration: '20 weeks',
    curriculum: [
      'Python for Data Science',
      'Statistics & Probability',
      'Data Analysis & Visualization',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Generative AI',
    ],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Generative AI'],
    published: true,
  },
];

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
