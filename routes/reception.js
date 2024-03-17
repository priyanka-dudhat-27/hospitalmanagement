const express=require('express');
const routs=express.Router();
const receptionController=require('../controllers/receptionController')

routs.get('/',receptionController.login)
routs.get('/dashboardReception',receptionController.dashboardDoctor)
routs.post('/signIn',receptionController.signIn);
routs.get('/book_appointment',receptionController.book_appointment);
routs.post('/add_appointment',receptionController.add_appointment);
routs.get('/view_appointment',receptionController.view_appointment);
routs.get('/deleteRecord/:id',receptionController.deleteRecord);
routs.get('/updateRecord/:id',receptionController.updateRecord);
routs.post('/edit_appointment/:id',receptionController.edit_appointment);


module.exports = routs;