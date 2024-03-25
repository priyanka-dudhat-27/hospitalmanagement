const express = require('express');
const routs = express();
const adminController = require('../controllers/adminController');
const Admin = require('../models/adminModel');
const passport = require('passport');

// Allow unauthenticated users to access the login page
routs.get('/', adminController.login);

// Protect other routes with authentication middleware
routs.post('/signIn', passport.authenticate('local', { failureRedirect: '/admin/' }), adminController.signIn);
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
routs.get('/forgetPass', passport.checkAuth, adminController.forgetPass);
routs.post('/checkEmailForget', passport.checkAuth, adminController.checkEmailForget);
routs.get('/checkOTP', passport.checkAuth, adminController.checkOTP);
routs.post('/verifyOtp', passport.checkAuth, adminController.verifyOtp);
routs.get('/adminChangePassword', passport.checkAuth, adminController.adminChangePassword);
routs.post('/resetPass', passport.checkAuth, adminController.resetPass);
routs.get('/deactive/:id', passport.checkAuth, adminController.deactive);
routs.get('/active/:id', passport.checkAuth, adminController.active);
routs.post('/deleteMultiple', passport.checkAuth, adminController.deleteMultiple);

routs.get('/logout', async(req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        return res.redirect('/main');
    });
});

// doctor
routs.use('/doctor_details', passport.checkAuth, require('./doctor_details'));
routs.use('/reception', passport.checkAuth, require('./reception'));
routs.use('/contacts', passport.checkAuth, require('./contacts'));
routs.use('/department', passport.checkAuth, require('./department'));

module.exports = routs;
