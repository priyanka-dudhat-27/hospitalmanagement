const express=require('express')
const routs=express.Router()
const postsController=require('../controllers/postsController')
const postsModel=require('../models/postsModel')

routs.get('/add_posts',postsController.add_posts)
routs.get('/view_posts',  postsController.view_posts);
routs.post('/insert_postsData', postsModel.uploadImage,  postsController.insert_postsData);
routs.get('/deleteRecord/:id',  postsController.deleteRecord);
routs.get('/updateRecord/:id',  postsController.updateRecord);
routs.post('/edit_posts/:id', postsModel.uploadImage,  postsController.edit_posts);
routs.get('/deactive/:id',postsController.deactive);
routs.get('/active/:id',postsController.active);
routs.post('/deleteMultiple',postsController.deleteMultiple);

module.exports =routs;