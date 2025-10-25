import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    updatedContent: { type: Object, default: null },
    notes: { type: String, default: null }
});

export default mongoose.model('AuditLog', AuditLogSchema);
