const mongoose=require('mongoose');
const dotenv=require('dotenv').config;
mongoose.connect(process.env.MONGODB_URL);
const db=mongoose.connection;
db.once('open',async(error)=>{
    (error)?console.log(error):console.log('db is connected');
})
module.exports=db;