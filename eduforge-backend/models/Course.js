import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  level: { type: String, default: 'Beginner' },
  units: [{
    title: String,
    videoId: String,
    summary: String,
    quiz: [{
      question: String,
      options: [String],
      answer: String
    }]
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);