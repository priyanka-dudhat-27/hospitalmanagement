const express=require('express');
const routs=express.Router();
const commentController=require('../controllers/commentController');
routs.get('/view_comments',commentController.view_comments);
routs.get('/deleteRecord/:id', commentController.deleteRecord);
routs.get('/deactive/:id',commentController.deactive )
routs.get('/active/:id',commentController.active )
routs.post('/deleteMultiple',commentController.deleteMultiple);

module.exports=routs;