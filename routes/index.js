const express=require('express');
const routs=express();

routs.use('/login',require('./login'));
routs.use('/admin',require('./admin'));
routs.use('/doctor',require('./doctor'));
routs.use('/reception',require('./reception'));

module.exports=routs;