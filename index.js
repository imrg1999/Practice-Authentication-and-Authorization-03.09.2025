import express from 'express';
import { connectAuthDB } from './Config/connectMNG.js';
import userRoute from './Route/userRoute.js';
import authRoute from './Route/authRoute.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',userRoute);

app.use('/auth',authRoute);

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