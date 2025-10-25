import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import logRoutes from './routes/logRoutes.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic Auth middleware for all /api routes
app.use('/api', authMiddleware);

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/logs', logRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('MongoDB connected');
    // Start server with port conflict handling (tries next port on EADDRINUSE)
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

    function startServer(port) {
        const server = app.listen(port, () => console.log(`Server running on port ${port}`));

        server.on('error', (err) => {
            if (err && err.code === 'EADDRINUSE') {
                console.error(`Port ${port} in use, attempting port ${port + 1}...`);
                setTimeout(() => startServer(port + 1), 500);
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });
    }

    startServer(DEFAULT_PORT);
})
.catch(err => console.error(err));
