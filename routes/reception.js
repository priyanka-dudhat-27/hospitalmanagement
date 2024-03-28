const express=require('express');
const routs=express.Router();
const receptionController=require('../controllers/receptionController')
const receptionModel=require('../models/receptionModel')
const passport=require('passport');

routs.get('/',receptionController.login)
routs.get('/dashboardReception',passport.checkAuth,receptionController.dashboardDoctor)
routs.post('/signIn',passport.authenticate('local', { failureRedirect: '/reception/' ,failureFlash:true}),receptionController.signIn);
routs.get('/book_appointment',passport.checkAuth,receptionController.book_appointment);
routs.post('/add_appointment',passport.checkAuth,receptionController.add_appointment);
routs.get('/view_appointment',passport.checkAuth,receptionController.view_appointment);
routs.get('/deleteRecord/:id',receptionController.deleteRecord);
routs.get('/updateRecord/:id',receptionController.updateRecord);
routs.post('/edit_appointment/:id',receptionController.edit_appointment);
routs.post('/del_multiple_appointments',receptionController.del_multiple_appointments)

// receptionist_details
routs.get('/add_reception',passport.checkAuth,receptionController.add_reception)
routs.post('/insert_reception_details',passport.checkAuth,receptionModel.uploadImage,receptionController.insert_reception_details);
routs.get('/view_reception',passport.checkAuth,receptionController.view_reception);
routs.get('/deleteRecord/:id',passport.checkAuth,receptionController.deleteRecord)
routs.get('/updateData/:id',passport.checkAuth,receptionController.updateData)
routs.post('/edit_reception/:id',passport.checkAuth,receptionModel.uploadImage,receptionController.edit_reception);
routs.get('/deactive/:id',passport.checkAuth,receptionController.deactive)
routs.get('/active/:id',passport.checkAuth,receptionController.active)
routs.post('/deleteMultiple',passport.checkAuth,receptionController.deleteMultiple)
routs.get('/profile', passport.checkAuth, receptionController.profile);
routs.get('/changePass', passport.checkAuth, receptionController.changePass);
routs.post('/resetReceptionPass', passport.checkAuth, receptionController.resetReceptionPass);
routs.get('/forgetPass', receptionController.forgetPass);
routs.post('/checkEmailForget', receptionController.checkEmailForget);
routs.get('/checkOTP', receptionController.checkOTP);
routs.post('/verifyOtp', receptionController.verifyOtp);
routs.get('/receptionChangePassword', receptionController.receptionChangePassword);
routs.post('/resetPass', receptionController.resetPass);

routs.use('/contacts',require('./contacts'))

module.exports = routs;