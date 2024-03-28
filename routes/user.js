const express=require('express');
const routs=express.Router();
const userController=require('../controllers/userController');

routs.get('/',userController.home)
routs.get('/appointment',userController.appointment)
routs.get('/about',userController.about)
routs.get('/services',userController.services)
routs.get('/doctors',userController.doctors)
routs.get('/contact',userController.contact)
routs.get('/blog_single',userController.blog_single)

// contact page
routs.post('/add_contact',userController.add_contact)
routs.post('/add_appointment',userController.add_appointment)

module.exports = routs;