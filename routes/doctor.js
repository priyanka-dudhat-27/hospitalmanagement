const express=require('express');
const routs=express.Router();
const doctorController=require('../controllers/doctorController')

routs.get('/',doctorController.login)
routs.get('/dashboardDoctor',doctorController.dashboardDoctor)
routs.post('/signIn',doctorController.signIn);


module.exports = routs;