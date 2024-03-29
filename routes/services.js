const express = require('express');
const routs=express.Router();
const servicesController=require('../controllers/servicesController')
const servicesModel=require('../models/servicesModel')
const passport=require('passport');

routs.get('/add_services',servicesController.add_services)
routs.get('/view_services', passport.checkAuth, servicesController.view_services);
routs.post('/insert_services', servicesModel.uploadImage, passport.checkAuth, servicesController.insert_servicesData);
routs.get('/deleteRecord/:id', passport.checkAuth, servicesController.deleteRecord);
routs.get('/updateRecord/:id', passport.checkAuth, servicesController.updateRecord);
routs.post('/edit_services/:id', servicesModel.uploadImage, passport.checkAuth, servicesController.edit_services);
routs.get('/deactive/:id',servicesController.deactive);
routs.get('/active/:id',servicesController.active);
routs.post('/deleteMultiple',servicesController.deleteMultiple);

module.exports =routs;