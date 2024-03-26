const doctor_detailsModel = require("../models/doctor_detailsModel");
const passport = require("passport");

module.exports.login = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("/doctor/dashboardDoctor");
    }
    return res.render("loginDoctor");
  } catch (err) {
    console.log(err);
    req.flash("error", "something wrong");
    return res.redirect("back");
  }
};
module.exports.dashboardDoctor = async (req, res) => {
  try {
    let doctorData = await doctor_detailsModel.find();
    // console.log(doctorData);

    if (!req.isAuthenticated()) {
      return res.redirect("/doctor/");
    }
    return res.render("dashboardDoctor", {
      doctorData: doctorData,
    });
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
      return res.redirect("/doctor/dashboardDoctor");
    } else {
      req.flash("error", "Invalid Credential");
      return res.render("logInDoctor");
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
      return res.render("profile_doctor", {
        doctorData: req.user,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };