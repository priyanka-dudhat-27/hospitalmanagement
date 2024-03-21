const express=require('express');
const routs=express();
const adminController=require('../controllers/adminController');
const Admin=require('../models/adminModel');
const passport=require('passport');

routs.get('/',passport.checkAuth,adminController.login);
routs.post('/signIn',passport.authenticate('local',{failureRedirect:'/admin/'}),adminController.signIn);
routs.get('/dashboard',passport.checkAuth,adminController.dashboard);
routs.get('/add_admin',passport.checkAuth,adminController.add_admin);
routs.get('/view_admin',passport.checkAuth,adminController.view_admin);
routs.post('/insert_adminData',Admin.uploadImage,adminController.insert_adminData)
routs.get('/deleteRecord/:id',adminController.deleteRecord)
routs.get('/updateRecord/:id',passport.checkAuth,adminController.updateRecord)
routs.post('/edit_admin/:id',Admin.uploadImage,adminController.edit_admin)
routs.get('/profile',passport.checkAuth,adminController.profile)
routs.get('/changePass',passport.checkAuth,adminController.changePass)
routs.post('/resetAdminPass',adminController.resetAdminPass)
routs.get('/forgetPass',adminController.forgetPass)
routs.post('/checkEmailForget',adminController.checkEmailForget)
routs.get('/checkOTP',adminController.checkOTP)
routs.post('/verifyOtp',adminController.verifyOtp)
routs.get('/adminChangePassword',adminController.adminChangePassword)
routs.post('/resetPass',adminController.resetPass)




routs.get('/logout',async(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
        }
        return res.redirect('/admin')
    })
})

// doctor
routs.use('/doctor_details',require('./doctor_details'))
routs.use('/reception',require('./reception'))

module.exports=routs;