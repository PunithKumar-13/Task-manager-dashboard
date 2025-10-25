export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: "Unauthorized access. Please provide valid credentials." });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const [username, password] = Buffer.from(base64Credentials, 'base64').toString('ascii').split(':');

    if (username === 'admin' && password === 'password123') {
        next();
    } else {
        return res.status(401).json({ error: "Unauthorized access. Please provide valid credentials." });
    }
}
