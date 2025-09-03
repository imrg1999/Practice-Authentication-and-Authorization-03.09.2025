import express from 'express';
import { connectAuthDB } from './Config/connectMNG.js';

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Homepage"
    });
});

connectAuthDB();

app.listen(port, ()=> {
    console.log(`Server is listening at port no. :${port}`);
})