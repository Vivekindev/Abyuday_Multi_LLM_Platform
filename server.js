import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});

const userBase = [
    {
        "username": "vivek@gmail.com",
        "password": "abc"
    },
    {
        "username": "mohan",
        "password": "def"
    }
];
app.get('/posts', authenticateToken, (req, res) => {
    const username = req.user.username;
    res.json({ username });
});



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
