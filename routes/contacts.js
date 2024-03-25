const express=require('express')
const routs=express.Router();
const contactsController=require('../controllers/contactsController')


routs.get('/view_contacts',contactsController.view_contacts)
routs.get('/deleteRecord/:id',contactsController.deleteRecord)
routs.get('/deactive/:id',contactsController.deactive)
routs.get('/active/:id',contactsController.active)
routs.post('/deleteMultiple',contactsController.deleteMultiple)

module.exports=routs;