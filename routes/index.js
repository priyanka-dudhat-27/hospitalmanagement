const express=require('express');
const routs=express();

routs.use('/main',require('./main'));
routs.use('/admin',require('./admin'));
routs.use('/doctor',require('./doctor'));
routs.use('/reception',require('./reception'));

// userpanel
routs.use('/',require('./user'));

module.exports=routs;