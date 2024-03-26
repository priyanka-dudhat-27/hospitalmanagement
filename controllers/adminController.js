const Admin = require("../models/adminModel");
const doctorModel = require("../models/doctor_detailsModel");
const appointmentModel = require("../models/appointmentModel");
const receptionModel=require('../models/receptionModel');
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const ROLES = require('../config/constants');

module.exports.login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/admin/dashboard");
    }
    return res.render("login");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
  }
};
module.exports.signIn = async (req, res) => {
  try {
    if (req.user) {
      req.flash("success", "Login Successfully");
      return res.redirect("/admin/dashboard");
    } else {
      req.flash("error", "Invalid Credential");
      return res.render("logIn");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.dashboard = async (req, res) => {
  let adminData = await Admin.find().countDocuments();
  let doctorData = await doctorModel.find().countDocuments();
  let receptionData = await receptionModel.find().countDocuments();
  let appointmentData = await appointmentModel.find().countDocuments();

  if (!req.isAuthenticated()) {
    return res.redirect("/admin/");
  }
  
  return res.render("dashboard", {
    adminData: adminData,
    doctorData: doctorData,
    receptionData: receptionData,
    appointmentData: appointmentData,
  });
};
module.exports.add_admin = async (req, res) => {
  try {
    return res.render("add_admin");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
  }
};

module.exports.insert_adminData = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    var img = "";
    if (req.file) {
      img = Admin.iPath + "/" + req.file.filename;
    }
    req.body.name = req.body.fname + " " + req.body.lname;
    req.body.image = img;
    req.body.status = true;
    req.body.role = ROLES.ADMIN; // Set the role to 'admin'


    let adminData = await Admin.create(req.body);
    if (adminData) {
      req.flash("success", "admin record added successfully");
      return res.redirect("/admin/view_admin");
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

module.exports.view_admin = async (req, res) => {
  try {
    // console.log(req.query.page);
    var page = 0;
    var per_page = 5;

    // console.log(req.query.search)
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let allRecord = await Admin.find({
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

    let viewData = await Admin.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .skip(page * per_page)
      .limit(per_page);

    if (viewData) {
      return res.render("view_admin", {
        adminData: viewData,
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
    let singleData = await Admin.findById(req.params.id);
    if (singleData) {
      let imagePath = path.join(__dirname, "..", singleData.image);
      await fs.unlinkSync(imagePath);
    } else {
      console.log("wrong");
      return res.redirect("back");
    }
    let delData = await Admin.findByIdAndDelete(req.params.id);
    if (delData) {
      req.flash("success", "record deleted successfully");
      return res.redirect("/admin/view_admin");
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
    let singleData = await Admin.findById(req.params.id);
    return res.render("edit_admin", {
      adminData: singleData,
    });
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.edit_admin = async (req, res) => {
  try {
    if (req.file) {
      let findData = await Admin.findById(req.params.id);
      if (findData) {
        let imagePath = path.join(__dirname, "..", findData.image);
        await fs.unlinkSync(imagePath);
      }
      var img = "";
      req.body.image = Admin.iPath + "/" + req.file.filename;
    } else {
      let findData = await Admin.findById(req.params.id);
      if (findData) {
        req.body.image = findData.image;
        req.body.name = req.body.fname + " " + req.body.lname;
      }
    }
    await Admin.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Record updated successfully");
    return res.redirect("/admin/view_admin");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.profile = async (req, res) => {
  try {
  // console.log(req.user);
    return res.render("profile_admin", {
      adminData: req.user,
    });
  } catch (err) {
    console.log(err)
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

// change password
module.exports.changePass = async (req, res) => {
  try {
    return res.render("changePass_admin");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
  }
};

module.exports.resetAdminPass = async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.cpass == req.user.password) {
      if (req.body.cpass != req.body.npass) {
        if (req.body.npass == req.body.conpass) {
          let changed = await Admin.findByIdAndUpdate(req.user.id, {
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
// forget password
module.exports.forgetPass = async (req, res) => {
  try {
    return res.render("forgetPass_admin");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};

module.exports.checkEmailForget = async (req, res) => {
  try {
    console.log(req.body);
    let checkEmail = await Admin.findOne({ email: req.body.email });
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
      return res.redirect("/admin/checkOTP");
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
    return res.render("checkOtp_admin");
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
      return res.redirect("/admin/adminChangePassword");
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
module.exports.adminChangePassword = async (req, res) => {
  try {
    return res.render("changePasswordAdmin");
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
      let checkEmail = await Admin.findOne({ email: email });
      if (checkEmail) {
        let changePass = await Admin.findByIdAndUpdate(checkEmail._id, {
          password: req.body.npass,
        });

        if (changePass) {
          req.session.destroy(function (err) {
            if (err) {
              console.log(err);
              req.flash("error", "something wrong");
            }
            return res.redirect("/admin");
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

// status active-deactive
module.exports.deactive = async (req, res) => {
  try {
    let adminDeactive = await Admin.findByIdAndUpdate(req.params.id, {
      status: false,
    });
    if (adminDeactive) {
      req.flash("success", "Admin deactivated successfully");
      return res.redirect("/admin/view_admin");
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
    let adminActive = await Admin.findByIdAndUpdate(req.params.id, {
      status: true,
    });
    if (adminActive) {
      req.flash("success", "Admin activated successfully");
      return res.redirect("/admin/view_admin");
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

// delete multiple records
module.exports.deleteMultiple = async (req, res) => {
  try {
    let d = await Admin.deleteMany({ _id: { $in: req.body.adminIds } });
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
