import AuditLog from '../models/AuditLog.js';

export async function getLogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const logs = await AuditLog.find()
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await AuditLog.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({ logs, totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
