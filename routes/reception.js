const express=require('express');
const routs=express.Router();
const receptionController=require('../controllers/receptionController')

routs.get('/',receptionController.login)
routs.get('/dashboardReception',receptionController.dashboardDoctor)
routs.post('/signIn',receptionController.signIn);


module.exports = routs;