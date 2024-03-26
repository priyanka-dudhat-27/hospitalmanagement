const doctor_detailsModel = require("../models/doctor_detailsModel");
const departmentModel=require('../models/departmentModel');
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");


module.exports.add_doctor = async (req, res) => {
  try {
    let departmentData=await departmentModel.find({status:true})
    if(departmentData){
      return res.render("add_doctor",{
        departmentData:departmentData
      });
    }
    else{
      console.log(error)
      req.flash("error","No department found");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }  
};
module.exports.insert_doctor = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    var img = "";
    if (req.file) {
      img = doctor_detailsModel.iPath + "/" + req.file.filename;
    }
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.image = img;
    req.body.status = true;

    let doctor_detailsData = await doctor_detailsModel.create(req.body);
    if (doctor_detailsData) {
      req.flash("success", "Doctor record created successfully");
      return res.redirect("/admin/doctor_details/view_doctor");
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
module.exports.view_doctor = async (req, res) => {
  try {
     // console.log(req.query.page);
     var page = 0;
     var per_page = 3;
    // console.log(req.query.search)
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let allRecord = await doctor_detailsModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }).countDocuments();
    let totalpage = Math.ceil(allRecord / per_page);
    console.log(totalpage);

    if (req.query.page) {
      page = req.query.page;
    }

    let viewData = await doctor_detailsModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
    .skip(page * per_page)
    .limit(per_page).populate('departmentId').exec()

    if (viewData) {
      return res.render("view_doctor", {
        doctor_detailsData: viewData,
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
module.exports.profile = async (req, res) => {
  try {
    // console.log(req.params.id);
  
    let singleData = await doctor_detailsModel.findById(req.params.id);
    if (singleData) {
      return res.render("profile_doctor", {
        singleData: singleData,
      });
    } else {
      req.flash("error", "profile not found");
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
    let singleData = await doctor_detailsModel.findById(req.params.id);
    if (singleData) {
      let imagePath = path.join(__dirname, "..", singleData.image);
      await fs.unlinkSync(imagePath);
    } else {
      console.log("wrong");
      return res.redirect("back");
    }
    let delData = await doctor_detailsModel.findByIdAndDelete(req.params.id);
    if (delData) {
      req.flash("success", "Record deleted successfully");
      return res.redirect("back");
    } else {
      console.log("something wrong");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.updateRecord = async (req, res) => {
  try {
    let singleData = await doctor_detailsModel.findById(req.params.id);
    console.log(singleData)
    return res.render("edit_doctor", {
      singleData: singleData,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.edit_doctor = async (req, res) => {
  try {
    if (req.file) {
      let findData = await doctor_detailsModel.findById(req.params.id);
      if (findData) {
        let imagePath = path.join(__dirname, "..", findData.image);
        await fs.unlinkSync(imagePath);
      }
      var img = "";
      req.body.image = doctor_detailsModel.iPath + "/" + req.file.filename;
    } else {
      let findData = await doctor_detailsModel.findById(req.params.id);
      if (findData) {
        req.body.image = findData.image;
        req.body.name = req.body.fname + " " + req.body.lname;
      }
    }
    await doctor_detailsModel.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Doctor record updated successfully");
    return res.redirect("/admin/doctor_details/view_doctor");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// status active-deactive
module.exports.deactive = async (req, res) => {
  try {
    let doctorDeactive = await doctor_detailsModel.findByIdAndUpdate(
      req.params.id,
      { status: false }
    );
    if (doctorDeactive) {
      req.flash("success", "Doctor deactivated successfully");
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
    let doctorActive = await doctor_detailsModel.findByIdAndUpdate(
      req.params.id,
      { status: true }
    );
    if (doctorActive) {
      req.flash("success", "Doctor activated successfully");
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

// multiple doctor records delete

module.exports.deleteMultiple = async (req, res) => {
  try {
    let d = await doctor_detailsModel.deleteMany({
      _id: { $in: req.body.doctorIds },
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

module.exports.changePass = async (req, res) => {
  try {
    return res.render("changePass_doctor");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
  }
};

module.exports.resetDoctorPass = async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.cpass == req.user.password) {
      if (req.body.cpass != req.body.npass) {
        if (req.body.npass == req.body.conpass) {
          let changed = await doctor_detailsModel.findByIdAndUpdate(req.user.id, {
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
    return res.render("forgetPass_doctor");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.checkEmailForget = async (req, res) => {
  try {
    console.log(req.body);
    let checkEmail = await doctor_detailsModel.findOne({ email: req.body.email });
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
      return res.redirect("/admin/doctor_details/checkOTP");
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
    return res.render("checkOtp_doctor");
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
      return res.redirect("/admin/doctor_details/doctorChangePassword");
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
module.exports.doctorChangePassword = async (req, res) => {
  try {
    return res.render("changePasswordDoctor");
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
      let checkEmail = await doctor_detailsModel.findOne({ email: email });
      if (checkEmail) {
        let changePass = await doctor_detailsModel.findByIdAndUpdate(checkEmail._id, {
          password: req.body.npass,
        });

        if (changePass) {
          req.session.destroy(function (err) {
            if (err) {
              console.log(err);
              req.flash("error", "something wrong");
            }
            return res.redirect("/doctor");
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

