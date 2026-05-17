import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, default: 'Student' },
    // 🛡️ CRITICAL FIX: You must define this so MongoDB accepts the sequential integer
    customId: { type: Number, unique: true } 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;