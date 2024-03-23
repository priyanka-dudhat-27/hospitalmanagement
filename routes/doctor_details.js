const express=require('express');
const routs=express.Router();
const doctor_detailsController=require('../controllers/doctor_detailsController')
const doctor_detailsModel=require('../models/doctor_detailsModel')

routs.get('/add_doctor',doctor_detailsController.add_doctor)
routs.post('/insert_doctor',doctor_detailsModel.uploadImage,doctor_detailsController.insert_doctor)
routs.get('/view_doctor',doctor_detailsController.view_doctor)
routs.get('/profile/:id',doctor_detailsController.profile)
routs.get('/deleteRecord/:id',doctor_detailsController.deleteRecord)
routs.get('/updateRecord/:id',doctor_detailsController.updateRecord)
routs.post('/edit_doctor/:id',doctor_detailsModel.uploadImage,doctor_detailsController.edit_doctor)
routs.get('/deactive/:id',doctor_detailsController.deactive)
routs.get('/active/:id',doctor_detailsController.active)
routs.post('/deleteMultiple',doctor_detailsController.deleteMultiple)


module.exports=routs;