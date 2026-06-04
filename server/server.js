const express=require('express');
require("dotenv").config();
const connectDb=require('./db');
const resumeRoutes=require('./Router/ResumeRoute')
const cors=require('cors')

const app=express();
app.use(express())
app.use(cors());

app.use(express.json());
app.use('/api/resumes', resumeRoutes);

const port=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("APi is running!.....")
})

connectDb();
app.listen(port,()=>{
    console.log(`server has started ${port}`);
})

