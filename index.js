import express from 'express';


const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Homepage"
    });
});

app.listen(port, ()=> {
    console.log(`Server is listening at port no. :${port}`);
})