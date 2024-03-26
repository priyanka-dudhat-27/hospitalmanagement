const contactModel=require('../models/contactModel')
const doctor_detailsModel=require('../models/doctor_detailsModel')
const departmentModel=require('../models/departmentModel')
const moment = require('moment')
const nodemailer=require('nodemailer')


module.exports.home=async(req,res)=>{
    try {
        return res.render('userpanel/home')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.appointment=async(req,res)=>{
    try {
        return res.render('userpanel/appointment')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.about=async(req,res)=>{
    try {
        return res.render('userpanel/about')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.services=async(req,res)=>{
    try {
        return res.render('userpanel/services')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.doctors=async(req,res)=>{
    try {
        let doctorData=await doctor_detailsModel.find().populate('departmentId').exec();
        let departmentData=await departmentModel.find();
        return res.render('userpanel/doctors',{
            doctorData:doctorData,
            departmentData:departmentData
        })
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.contact=async(req,res)=>{
    try {
        return res.render('userpanel/contact')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}

module.exports.add_contact=async(req,res)=>{
    try{
        // console.log(req.body)
        req.body.created_date=moment().format('LLL');
        req.body.status=true;
        let contactData=await contactModel.create(req.body);
        if(contactData){
           let checkEmail=await contactModel.findOne({email:req.body.email});
           if(checkEmail){
            const transporter = nodemailer.createTransport({
                host: "smtp.GMAIL.COM",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "pdudhat27@gmail.com",
                  pass: "mwfmuosjsoikcgmh",
                },
              });
             
              var msg=`<h1>Thank You For Contact Us</h1>`
              const info = await transporter.sendMail({
                from: 'pdudhat27@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Website Link", // Subject line
                text: "Welcome to Novena Health & Care !!", // plain text body
                html: msg// html body
              });
              return res.redirect('/contact');
           }
        }
        else{
            req.flash('error','Error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}