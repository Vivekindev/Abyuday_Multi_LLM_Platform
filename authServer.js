import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 4040;
const app = express();



app.use(cors({
    exposedHeaders: ['Authorization'] // Expose Authorization header
  }));

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

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let found = false;
    userBase.forEach(item => {
        if (item.username == username) {
            found = true;
        }
    })
    if (!found) {
        userBase.push({ username: username, password: password });
      
        const user = { username: username };
        const accessToken =  generateAccessToken(user);
        res.json({ accessToken: accessToken});
    } 
    else {
        res.sendStatus(409);
    }
})


app.post('/api/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    let found = false;
    userBase.map(item =>{
        if(item.username === username && item.password === password){
            
            const user = { username: username };
            const accessToken =  generateAccessToken(user);
            res.setHeader('Authorization', 'Bearer ' + accessToken);
            res.sendStatus(200);
            found = true;
        }   
    })
    if(!found)
    res.sendStatus(401);
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}
