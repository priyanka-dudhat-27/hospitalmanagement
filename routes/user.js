const express=require('express');
const routs=express.Router();
const userController=require('../controllers/userController');

routs.get('/',userController.home)
routs.get('/appointment',userController.appointment)
routs.get('/about',userController.about)
routs.get('/services',userController.services)
routs.get('/doctors',userController.doctors)
routs.get('/contact',userController.contact)

module.exports = routs;