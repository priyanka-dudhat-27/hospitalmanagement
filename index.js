const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const port=process.env.PORT || 3000;
const path=require('path');
const db=require('./config/mongoose')

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'assets')))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

app.use('/',require('./routes/index'))
app.listen(port,async(err)=>{
    (err)?console.log('Something Wrong !'):console.log(`Server is running on port ${port}`);
})