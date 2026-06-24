import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Missing token' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken.id;
        req.auth = { userId };
        next();
    } catch (err) {
        res.status(401).json({
            error: 'Unauthorized Token'
        });
    }
};