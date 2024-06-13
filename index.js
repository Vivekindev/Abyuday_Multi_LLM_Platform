import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import pushToDb from './functions/db.js';
import getIST from './functions/getIST.js'

import {sendRequest} from './functions/nvidia.js';

const __dirname = path.resolve();

dotenv.config();
const app = express();
const port = process.env.PORT || 4040; // Choose the port you want to use



app.use(express.static(path.join(__dirname,"./client/dist")));

app.use(express.static(path.join(__dirname,"./")));
// app.get('/home',function(_,res){
//     res.sendFile(path.join(__dirname, "./home.html"), function(err){
// res.status(500).send(err);
//     })
// })

app.get('*',function(_,res){
    res.sendFile(path.join(__dirname, "./client/dist/index.html"), function(err){
res.status(500).send(err);
    })
})




app.use(express.json());
app.post('/api/verifyToken',authenticateToken,(req,res)=>{
    res.sendStatus(200);
})
app.post("/api/login",(req,res)=>{
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

app.post("/api/:modelName",authenticateToken, async (req, res) => {
    const userMessage = req.body.messages[0].content;
    const model = req.params.modelName;
    if (!userMessage) {
        res.status(400).send("Invalid request format. Please provide a user message in the request body.");
        return;
    }
    try {
        const responseMessage = await sendRequest(userMessage,model);
        res.json(responseMessage);
        pushToDb(userMessage,responseMessage,getIST());
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing the request.");
    }
});



//----------------------------------------------authServer-------------------------------------------//
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





function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

//-------------------------------------------------------------------------------------------------//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//Middleware function
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

