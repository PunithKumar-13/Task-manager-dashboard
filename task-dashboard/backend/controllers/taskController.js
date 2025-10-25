import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';
import { sanitize } from '../utils/sanitize.js';

// Get tasks with pagination & search
export async function getTasks(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const q = req.query.q ? sanitize(req.query.q.trim()) : '';

        const filter = q ? { $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
        ]} : {};

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Task.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        res.json({ tasks, totalPages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Create task
export async function createTask(req, res) {
    try {
        const title = sanitize(req.body.title?.trim() ?? '');
        const description = sanitize(req.body.description?.trim() ?? '');
        const urgent = !!req.body.urgent;
        const notes = sanitize(req.body.notes?.trim() ?? '');

        if (!title || !description) return res.status(400).json({ error: 'Title and Description required' });

        const task = await Task.create({ title, description, urgent, notes });

        // Audit log: For creation, only record notes if provided (non-empty)
        await AuditLog.create({
            action: 'Create Task',
            taskId: task._id,
            notes: notes || null
        });

        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Update task
export async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const updatedContent = {};

        if (req.body.hasOwnProperty('title')) {
            const newTitle = sanitize((req.body.title ?? '').trim());
            if (newTitle !== task.title) {
                if (!newTitle) return res.status(400).json({ error: 'Title cannot be empty' });
                updatedContent.title = newTitle;
            }
        }

        if (req.body.hasOwnProperty('description')) {
            const newDescription = sanitize((req.body.description ?? '').trim());
            if (newDescription !== task.description) {
                if (!newDescription) return res.status(400).json({ error: 'Description cannot be empty' });
                updatedContent.description = newDescription;
            }
        }

        if (typeof req.body.urgent !== 'undefined') {
            const newUrgent = !!req.body.urgent;
            if (newUrgent !== task.urgent) {
                updatedContent.urgent = newUrgent;
            }
        }

        if (req.body.hasOwnProperty('notes')) {
            const newNotes = sanitize((req.body.notes ?? '').trim());
            if (newNotes !== task.notes) {
                updatedContent.notes = newNotes;
            }
        }

        if (Object.keys(updatedContent).length === 0) return res.status(400).json({ error: 'No changes detected' });

        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedContent, { new: true });

        // Audit log: For update, show all changed fields including notes
        await AuditLog.create({
            action: 'Update Task',
            taskId: task._id,
            updatedContent
        });

        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Delete task
export async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        await Task.findByIdAndDelete(taskId);

        await AuditLog.create({
            action: 'Delete Task',
            taskId: task._id
        });

        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}