const express=require('express');
const routs=express();

routs.use('/login',require('./login'));
routs.use('/admin',require('./admin'));

module.exports=routs;