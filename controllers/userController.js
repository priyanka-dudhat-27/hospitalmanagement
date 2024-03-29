const contactModel=require('../models/contactModel')
const doctor_detailsModel=require('../models/doctor_detailsModel')
const departmentModel=require('../models/departmentModel')
const appointmentModel=require('../models/appointmentModel')
const servicesModel=require('../models/servicesModel')
const postsModel=require('../models/postsModel')
const commentModel=require('../models/commentModel')
const moment = require('moment')
const nodemailer=require('nodemailer')


module.exports.home=async(req,res)=>{
    try {
        let departmentData=await departmentModel.find();
        req.flash('success','You Got appointment confirmed mail on your Entered Email')
        return res.render('userpanel/home',{
            departmentData:departmentData
        })
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.appointment=async(req,res)=>{
    try {
        let departmentData=await departmentModel.find();
        return res.render('userpanel/appointment',{
            departmentData:departmentData
        })
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.add_appointment = async (req, res) => {
    try{
      // console.log(req.body)
      req.body.name = req.body.fname + " " + req.body.lname;
      req.body.created_date=moment().format('LLL');
      req.body.status=true;
      let appointmentData=await appointmentModel.create(req.body);
      if(appointmentData){
         let checkEmail=await appointmentModel.findOne({email:req.body.email});
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

            var msg=`<h4>Welcome <span>${req.body.name}</span> !!</h4>`
                msg=`<h3>Your Appointment Booked Successfully at <span style="color:green;font-size:20px">Novena Health & Care</span></h3>`
                msg+=`<h5>Appointment Date :${req.body.appointmentDate} on ${req.body.appointmentTime}</h5>`

            const info = await transporter.sendMail({
              from: 'pdudhat27@gmail.com', // sender address
              to: req.body.email, // list of receivers
              subject: "Website Link", // Subject line
              text: "Welcome to Novena Health & Care !!", // plain text body
              html: msg// html body
            });
            return res.redirect('back');
         }
      }
      else{
          req.flash('error','Error');
          return res.redirect('back');
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
module.exports.about=async(req,res)=>{
    try {
        let postsData=await postsModel.find();
        return res.render('userpanel/about',{
            postsData:postsData,
        })
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.services=async(req,res)=>{
    try {
        let servicesData=await servicesModel.find();
        return res.render('userpanel/services',{
            servicesData:servicesData
        })
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
             
              var msg=`<h3>Thank You For Contact ${req.body.name}</h3>`
                  msg+=`<h3>Welcome at <span style="color:green;font-size:22px">Novena Health & Care</span></h3>`
                  msg+=`<h5>Our team will contact you soon...</h5>`
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

// blog_single page
module.exports.blog_single=async(req,res)=>{
    try{
        console.log(req.params.id)
         // comment logic start
         let commentData=await commentModel.find({});
        //  console.log(commentData)
         // comment logic end
        // next previous logic start
        // let allIds=await postsModel.find({}).select('_id');
        // let current;

        // allIds.map((v,i)=>{
        //     if(v._id==req.params.id){
        //         current=i;
        //     }
        // })
        // next-previous logic end
       
        let singleData=await postsModel.findById(req.params.id);
        if(singleData){
            return res.render('userpanel/blog_single', {
                postsData: singleData,
                // allIds: allIds,
                // pos: current,
                commentData: commentData,
            });
        } else {
            req.flash('error', 'Post not found');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error','something wrong!')
        return res.redirect('back')
    }
}

module.exports.add_comment=async(req,res)=>{
    try{
        console.log(req.file)
        console.log(req.body)
        let img='';
        if(req.file){
            img=commentModel.iPath+'/'+req.file.filename;
        }
        req.body.commentImage=img;
        req.body.created_date=moment().format('LLL');
        let addData=await commentModel.create(req.body);
        if(addData){
            req.flash('success','Comments Added !');
            return res.redirect('back');
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


