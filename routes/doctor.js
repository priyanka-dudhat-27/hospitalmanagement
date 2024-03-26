const express=require('express');
const routs=express.Router();
const doctorController=require('../controllers/doctorController')
const passport=require('passport');

routs.get('/',doctorController.login)
routs.get('/dashboardDoctor',doctorController.dashboardDoctor)
routs.post('/signIn',passport.authenticate('local', { failureRedirect: '/reception/',failureFlash:true }),doctorController.signIn);


module.exports = routs;