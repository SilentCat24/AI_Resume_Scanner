const express=require('express');
require("dotenv").config();
const connectDb=require('./db');

const app=express();
app.use(express())
app.use(express.json());

const port=process.env.PORT || 8000;


app.get('/',(req,res)=>{
    res.send("APi is running!.....")
})

connectDb();
app.listen(port,()=>{
    console.log(`server has started ${port}`);
})

