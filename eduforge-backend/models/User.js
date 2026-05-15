import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, default: 'Student' },
    createdAt: { type: Date, default: new Date() }
});

export default mongoose.model('User', userSchema);