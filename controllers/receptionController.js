const appointmentModel = require("../models/appointmentModel");
const receptionModel = require("../models/receptionModel");
const contactModel = require("../models/contactModel");
const doctor_detailsModel=require('../models/doctor_detailsModel')
const departmentModel=require('../models/departmentModel')
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const nodemailer = require("nodemailer");
const ROLES=require("../config/constants")

module.exports.login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      if(req.user.role===ROLES.RECEPTIONIST){
        return res.redirect("/reception/dashboardReception");
      }
    }
    return res.render("loginReception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.dashboardDoctor = async (req, res) => {
  try {
    let appointmentData = await appointmentModel.find().countDocuments();
    let receptionData = await receptionModel.find().countDocuments();
    let contactData = await contactModel.find().countDocuments();

    if (req.isAuthenticated() && req.user.role =='receptionist') {
      return res.render("dashboardReception", {
        appointmentData: appointmentData,
        receptionData: receptionData,
        contactData:contactData
      });
    }else{
      return res.redirect("/main");
    }
    
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.signIn = async (req, res) => {
  try {
    // console.log(req.user)
    if (req.user) {
      req.flash("success", "Login Successfully");
      return res.redirect("/reception/dashboardReception");
    } else {
      req.flash("error", "Invalid Credential");
      return res.render("logInReception");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.book_appointment = async (req, res) => {
  try {
    let departmentData=await departmentModel.find();
    let appointmentData=await appointmentModel.find();
    return res.render("book_appointment",{
      departmentData:departmentData,
      appointmentData:appointmentData
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.render("back");
  }
};

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
         
          var msg=`<h1>Your Appointment Booked Successfully at <span>Novena Health & Care</span></h1>`
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

module.exports.view_appointment = async (req, res) => {
  try {
    // console.log(req.query.page);
    var page = 0;
    var per_page = 5;
    // console.log(req.query.search)
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let allRecord = await appointmentModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).countDocuments();
    let totalpage = Math.ceil(allRecord / per_page);
    console.log(totalpage);

    if (req.query.page) {
      page = req.query.page;
    }

    let viewData = await appointmentModel
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
      .skip(page * per_page)
      .limit(per_page).populate('departmentId','doctorId').exec()

    if (viewData) {
      return res.render("view_appointment", {
        appointmentData: viewData,
        search: search,
        totalpage: totalpage,
        currentPage: page,
        per_page: per_page,
      });
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.deleteRecord = async (req, res) => {
  try {
    let delData = await appointmentModel.findByIdAndDelete(req.params.id);
    if (delData) {
      req.flash("success", "Record deleted successfully");
      return res.redirect("/reception/view_appointment");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.updateRecord = async (req, res) => {
  try {
    let singleData = await appointmentModel.findById(req.params.id);
    return res.render("edit_appointment", {
      appointmentData: singleData,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.edit_appointment = async (req, res) => {
  try {
    req.body.name = req.body.fname + " " + req.body.lname;

    await appointmentModel.findByIdAndUpdate(req.params.id, req.body);

    req.flash("success", "Appointment updated successfully");
    return res.redirect("/reception/view_appointment");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// receptionist_details
module.exports.add_reception = async (req, res) => {
  try {
    return res.render("add_reception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.render("back");
  }
};

module.exports.insert_reception_details = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    var img = "";
    if (req.file) {
      img = receptionModel.iPath + "/" + req.file.filename;
    }
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.image = img;
    req.body.status = true;

    let receptionData = await receptionModel.create(req.body);
    if (receptionData) {
      req.flash("success", "Record created successfully");
      return res.redirect("/reception/view_reception");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.view_reception = async (req, res) => {
  try {
    // console.log(req.query.page);
    var page = 0;
    var per_page = 5;
    // console.log(req.query.search)
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let allRecord = await receptionModel
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
      .countDocuments();
    let totalpage = Math.ceil(allRecord / per_page);
    console.log(totalpage);

    if (req.query.page) {
      page = req.query.page;
    }

    let viewData = await receptionModel
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
      .skip(page * per_page)
      .limit(per_page);

    if (viewData) {
      return res.render("view_reception", {
        receptionData: viewData,
        search: search,
        totalpage: totalpage,
        currentPage: page,
        per_page: per_page,
      });
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.deleteRecord = async (req, res) => {
  try {
    let singleData = await receptionModel.findById(req.params.id);
    if (singleData) {
      let imagePath = path.join(__dirname, "..", singleData.image);
      await fs.unlinkSync(imagePath);
    } else {
      console.log("wrong");
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
    let delData = await receptionModel.findByIdAndDelete(req.params.id);
    if (delData) {
      req.flash("success", "Record deleted successfully");
      return res.redirect("/reception/view_reception");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.updateData = async (req, res) => {
  try {
    let singleData = await receptionModel.findById(req.params.id);
    return res.render("edit_reception", {
      receptionData: singleData,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.edit_reception = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.file)
    if (req.file) {
      let findData = await receptionModel.findById(req.params.id);
      if (findData) {
        let imagePath = path.join(__dirname, "..", findData.image);
        await fs.unlinkSync(imagePath);
      }
      var img = "";
      req.body.image = receptionModel.iPath + "/" + req.file.filename;
    } else {
      let findData = await receptionModel.findById(req.params.id);
      if (findData) {
        req.body.image = findData.image;
        req.body.name = req.body.fname + " " + req.body.lname;
      }
    }
    await receptionModel.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Record updated successfully");
    return res.redirect("/reception/view_reception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

//status active deactive
module.exports.deactive = async (req, res) => {
  try {
    let receptionDeactive = await receptionModel.findByIdAndUpdate(
      req.params.id,
      { status: false }
    );
    if (receptionDeactive) {
      req.flash("success", "Reception deactivated successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.active = async (req, res) => {
  try {
    let receptionActive = await receptionModel.findByIdAndUpdate(
      req.params.id,
      { status: true }
    );
    let appointmentActive = await appointmentModel.findByIdAndUpdate(
      req.params.id,
      { status: true }
    );

    if (receptionActive) {
      req.flash("success", "Reception activated successfully");
      return res.redirect("back");
    }else if(appointmentActive){
      req.flash("success", "Reception activated successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// delete multiple reception records
module.exports.deleteMultiple = async (req, res) => {
  try {
    let d = await receptionModel.deleteMany({
      _id: { $in: req.body.receptionIds },
    });
    if (d) {
      req.flash("success", "Multiple records deleted successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// delete multiple appointments records
module.exports.del_multiple_appointments = async (req, res) => {
  try {
    let d = await appointmentModel.deleteMany({
      _id: { $in: req.body.appointmentIds },
    });
    if (d) {
      req.flash("success", "Multiple records deleted successfully");
      return res.redirect("back");
    } else {
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.profile = async (req, res) => {
  try {
    // console.log(req.user);
    return res.render("profile_reception", {
      receptionData: req.user,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.changePass = async (req, res) => {
  try {
    return res.render("changePass_reception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
  }
};

module.exports.resetReceptionPass = async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.cpass == req.user.password) {
      if (req.body.cpass != req.body.npass) {
        if (req.body.npass == req.body.conpass) {
          let changed = await receptionModel.findByIdAndUpdate(req.user.id, {
            password: req.body.npass,
          });
          if (changed) {
            req.flash("success", "Password Changed Successfully");
            return res.redirect("/admin/logout");
          } else {
            req.flash("error", "Password not change");
            return res.redirect("back");
          }
        } else {
          req.flash("error", "New and confirm password not same");
          return res.redirect("back");
        }
      } else {
        req.flash("error", "Current and New password are same");
        return res.redirect("back");
      }
    } else {
      req.flash("error", "db password not match");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
// forget password logic

module.exports.forgetPass = async (req, res) => {
  try {
    return res.render("forgetPass_reception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.checkEmailForget = async (req, res) => {
  try {
    console.log(req.body);
    let checkEmail = await receptionModel.findOne({ email: req.body.email });
    if (checkEmail) {
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

      var otp = Math.round(Math.random() * 10000);
      req.session.otp = otp;
      req.session.email = req.body.email;
      var msg = `<h1>RnW inbstitute: <b>otp:${otp}</b></h1>`;
      const info = await transporter.sendMail({
        from: "pdudhat27@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Your OTP is Here", // Subject line
        text: "Hello world?", // plain text body
        html: msg,
        otp, // html body
      });
      return res.redirect("/admin/reception/checkOTP");
    } else {
      req.flash("error", "Invalid Email");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.checkOTP = async (req, res) => {
  try {
    return res.render("checkOtp_reception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.verifyOtp = async (req, res) => {
  console.log(req.body);
  // console.log(req.user.otp);
  try {
    if (req.body.otp == req.session.otp) {
      return res.redirect("/admin/reception/receptionChangePassword");
    } else {
      req.flash("error", "OTP not match");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.receptionChangePassword = async (req, res) => {
  try {
    return res.render("changePasswordReception");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.resetPass = async (req, res) => {
  try {
    console.log(req.body.npass);
    console.log(req.body.conpass);

    // Retrieve email from session
    var email = req.session.email;
    console.log(email);

    if (req.body.npass == req.body.conpass) {
      let checkEmail = await receptionModel.findOne({ email: email });
      if (checkEmail) {
        let changePass = await receptionModel.findByIdAndUpdate(checkEmail._id, {
          password: req.body.npass,
        });

        if (changePass) {
          req.session.destroy(function (err) {
            if (err) {
              console.log(err);
              req.flash("error", "something wrong");
            }
            return res.redirect("/reception");
          });
        }
      } else {
        req.flash("error", "Invalid Email");
        return res.redirect("back");
      }
    } else {
      req.flash("success", "Password has been changed Successfully");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// appointment booked by user website
module.exports.confirmAppointment=async(req,res)=>{
  try {
    
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
}