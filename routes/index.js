const express=require('express');
const routs=express();

routs.use('/admin',require('./admin'));

module.exports=routs;