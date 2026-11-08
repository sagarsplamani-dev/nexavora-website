import mongoose from 'mongoose';
import Course from '../models/Course.js';

export const listCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true })
      .sort({ title: 1 })
      .select('slug title description duration curriculum skills')
      .lean();
    return res.status(200).json({ courses });
  } catch (error) {
    console.error('Course list failed:', error.name || 'UnknownError');
    return res.status(500).json({ error: 'Unable to retrieve courses.' });
  }
};

export const getCourse = async (req, res) => {
  const { id } = req.params;
  const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() };

  try {
    const course = await Course.findOne({ ...filter, published: true })
      .select('slug title description duration curriculum skills')
      .lean();
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    return res.status(200).json({ course });
  } catch (error) {
    console.error('Course detail failed:', error.name || 'UnknownError');
    return res.status(500).json({ error: 'Unable to retrieve the course.' });
  }
};
