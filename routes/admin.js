const express = require('express');
const routs = express();
const adminController = require('../controllers/adminController');
const Admin = require('../models/adminModel');
const passport = require('passport');

// Allow unauthenticated users to access the login page
routs.get('/',adminController.login);

// Protect other routes with authentication middleware
routs.post('/signIn', passport.authenticate('local', { failureRedirect: '/admin/',failureFlash:true }), adminController.signIn);
routs.get('/dashboard', passport.checkAuth, adminController.dashboard);
routs.get('/add_admin', passport.checkAuth, adminController.add_admin);
routs.get('/view_admin', passport.checkAuth, adminController.view_admin);
routs.post('/insert_adminData', Admin.uploadImage, passport.checkAuth, adminController.insert_adminData);
routs.get('/deleteRecord/:id', passport.checkAuth, adminController.deleteRecord);
routs.get('/updateRecord/:id', passport.checkAuth, adminController.updateRecord);
routs.post('/edit_admin/:id', Admin.uploadImage, passport.checkAuth, adminController.edit_admin);
routs.get('/profile', passport.checkAuth, adminController.profile);
routs.get('/changePass', passport.checkAuth, adminController.changePass);
routs.post('/resetAdminPass', passport.checkAuth, adminController.resetAdminPass);
routs.get('/forgetPass', adminController.forgetPass);
routs.post('/checkEmailForget',adminController.checkEmailForget);
routs.get('/checkOTP', adminController.checkOTP);
routs.post('/verifyOtp', adminController.verifyOtp);
routs.get('/adminChangePassword', adminController.adminChangePassword);
routs.post('/resetPass', adminController.resetPass);
routs.get('/deactive/:id',adminController.deactive);
routs.get('/active/:id',adminController.active);
routs.post('/deleteMultiple',adminController.deleteMultiple);

routs.get('/logout', async(req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        return res.redirect('/main');
    });
});

// doctor
routs.use('/doctor_details', require('./doctor_details'));
routs.use('/reception', require('./reception'));
routs.use('/contacts', passport.checkAuth, require('./contacts'));
routs.use('/department', passport.checkAuth, require('./department'));

module.exports = routs;
