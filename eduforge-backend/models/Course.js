import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoId: { type: String, required: true },
    summary: { type: String, required: true }, 
    quiz: [{
        text: String,
        options: [String],
        correct: { type: Number, required: true }
    }]
});

const courseSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    level: { type: String, required: true },
    units: [unitSchema],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);