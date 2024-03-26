const express=require('express');
const routs=express.Router();
const doctor_detailsController=require('../controllers/doctor_detailsController')
const doctor_detailsModel=require('../models/doctor_detailsModel')
const passport=require('passport');

routs.get('/add_doctor',passport.checkAuth,doctor_detailsController.add_doctor)
routs.post('/insert_doctor',passport.checkAuth,doctor_detailsModel.uploadImage,doctor_detailsController.insert_doctor)
routs.get('/view_doctor',passport.checkAuth,doctor_detailsController.view_doctor)
routs.get('/profile/:id',passport.checkAuth,doctor_detailsController.profile)
routs.get('/deleteRecord/:id',passport.checkAuth,doctor_detailsController.deleteRecord)
routs.get('/updateRecord/:id',passport.checkAuth,doctor_detailsController.updateRecord)
routs.post('/edit_doctor/:id',passport.checkAuth,doctor_detailsModel.uploadImage,doctor_detailsController.edit_doctor)
routs.get('/deactive/:id',passport.checkAuth,doctor_detailsController.deactive)
routs.get('/active/:id',passport.checkAuth,doctor_detailsController.active)
routs.post('/deleteMultiple',passport.checkAuth,doctor_detailsController.deleteMultiple)
routs.get('/profile',passport.checkAuth,doctor_detailsController.profile);
routs.get('/changePass',passport.checkAuth,doctor_detailsController.changePass);
routs.post('/resetDoctorPass',passport.checkAuth,doctor_detailsController.resetDoctorPass);
routs.get('/forgetPass',doctor_detailsController.forgetPass);
routs.post('/checkEmailForget',doctor_detailsController.checkEmailForget);
routs.get('/checkOTP',doctor_detailsController.checkOTP);
routs.post('/verifyOtp',doctor_detailsController.verifyOtp);
routs.get('/doctorChangePassword',doctor_detailsController.doctorChangePassword);
routs.post('/resetPass',doctor_detailsController.resetPass);


module.exports=routs;