const express=require('express');
const routs=express.Router();
const receptionController=require('../controllers/receptionController')
const receptionModel=require('../models/receptionModel')


routs.get('/',receptionController.login)
routs.get('/dashboardReception',receptionController.dashboardDoctor)
routs.post('/signIn',receptionController.signIn);
routs.get('/book_appointment',receptionController.book_appointment);
routs.post('/add_appointment',receptionController.add_appointment);
routs.get('/view_appointment',receptionController.view_appointment);
routs.get('/deleteRecord/:id',receptionController.deleteRecord);
routs.get('/updateRecord/:id',receptionController.updateRecord);
routs.post('/edit_appointment/:id',receptionController.edit_appointment);
routs.post('/del_multiple_appointments',receptionController.del_multiple_appointments)

// receptionist_details
routs.get('/add_reception',receptionController.add_reception)
routs.post('/insert_reception_details',receptionModel.uploadImage,receptionController.insert_reception_details);
routs.get('/view_reception',receptionController.view_reception);
routs.get('/deleteRecord/:id',receptionController.deleteRecord)
routs.get('/updateRecord/:id',receptionController.deleteRecord)
routs.post('/edit_reception/:id',receptionModel.uploadImage,receptionController.edit_reception);
routs.get('/deactive/:id',receptionController.deactive)
routs.get('/active/:id',receptionController.active)
routs.post('/deleteMultiple',receptionController.deleteMultiple)


routs.use('/contacts',require('./contacts'))

module.exports = routs;