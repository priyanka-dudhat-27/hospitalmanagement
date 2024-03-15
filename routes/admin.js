const express=require('express');
const routs=express();
const adminController=require('../controllers/adminController');
const Admin=require('../models/adminModel');

routs.get('/',adminController.login);
routs.post('/signIn',adminController.signIn);
routs.get('/dashboard',adminController.dashboard);
routs.get('/add_admin',adminController.add_admin);
routs.get('/view_admin',adminController.view_admin);
routs.post('/insert_adminData',Admin.uploadImage,adminController.insert_adminData)
routs.get('/deleteRecord/:id',adminController.deleteRecord)
routs.get('/updateRecord/:id',adminController.updateRecord)
routs.post('/edit_admin/:id',Admin.uploadImage,adminController.edit_admin)


module.exports=routs;