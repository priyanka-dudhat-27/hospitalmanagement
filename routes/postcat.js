const express=require('express');
const routs=express.Router();
const postcatController=require('../controllers/postcatController')

routs.get('/add_postcat',postcatController.add_postcat);
routs.post('/insert_postcat',postcatController.insert_postcat);
routs.get('/view_postcat',postcatController.view_postcat);
routs.get('/deleteRecord/:id',postcatController.deleteRecord)
routs.get('/updateRecord/:id',postcatController.updateRecord)
routs.post('/edit_postcat/:id',postcatController.edit_postcat)
routs.get('/deactive/:id',postcatController.deactive)
routs.get('/active/:id',postcatController.active)
routs.post('/deleteMultiple',postcatController.deleteMultiple)


module.exports = routs;