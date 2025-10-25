// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    urgent: { type: Boolean, default: false },
    notes: { type: String, default: '' } // added notes
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export default mongoose.model('Task', TaskSchema);
