const express=require('express');
const routs=express.Router();
const userController=require('../controllers/userController');
const commentModel=require('../models/commentModel')

routs.get('/',userController.home)
routs.get('/appointment',userController.appointment)
routs.get('/about',userController.about)
routs.get('/services',userController.services)
routs.get('/doctors',userController.doctors)
routs.get('/contact',userController.contact)

// contact page
routs.post('/add_contact',userController.add_contact)
routs.post('/add_appointment',userController.add_appointment)

// blog single page
routs.get('/blog_single/:id',userController.blog_single)
// comment
routs.post('/add_comment',commentModel.uploadImage,userController.add_comment)


module.exports = routs;