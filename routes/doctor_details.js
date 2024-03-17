const express=require('express');
const routs=express.Router();
const doctor_detailsController=require('../controllers/doctor_detailsController')

routs.get('/add_doctor',doctor_detailsController.add_doctor)
routs.get('/view_doctor',doctor_detailsController.view_doctor)

module.exports=routs;