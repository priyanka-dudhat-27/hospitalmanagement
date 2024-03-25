const express=require('express');
const routs=express.Router();
const departmentController=require('../controllers/departmentController')

routs.get('/add_department',departmentController.add_department);
routs.post('/insert_department',departmentController.insert_department);
routs.get('/view_department',departmentController.view_department);
routs.get('/deleteRecord/:id',departmentController.deleteRecord)
routs.get('/updateRecord/:id',departmentController.updateRecord)
routs.post('/edit_department/:id',departmentController.edit_department)
routs.get('/deactive/:id',departmentController.deactive)
routs.get('/active/:id',departmentController.active)
routs.post('/deleteMultiple',departmentController.deleteMultiple)


module.exports = routs;