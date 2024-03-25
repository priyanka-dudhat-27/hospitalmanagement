const contactModel = require("../models/contactModel");

module.exports.view_contacts = async (req, res) => {
  try {
    // console.log(req.query.page);
    var page = 0;
    var per_page = 5;

    // console.log(req.query.search)
    var search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    let allRecord = await contactModel.find({
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

    let contactData = await contactModel
      .find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      })
      .skip(page * per_page)
      .limit(per_page);

    if (contactData) {
      return res.render("view_contacts", {
        contactData: contactData,
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
      let delData = await contactModel.findByIdAndDelete(req.params.id);
      if (delData) {
        req.flash("success", "Record deleted successfully");
        return res.redirect("/contacts/view_contacts");
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

//   active-deactive status
module.exports.deactive = async (req, res) => {
    try {
      let contactDeactive = await contactModel.findByIdAndUpdate(
        req.params.id,
        { status: false }
      );
      if (contactDeactive) {
        req.flash("success", "Contact attended successfully");
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
      let contactActive = await contactModel.findByIdAndUpdate(
        req.params.id,
        { status: true }
      );
      if (contactActive) {
        req.flash("success", "contact pending successfully");
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

//   delete multiple records
module.exports.deleteMultiple = async (req, res) => {
    try {
      let d = await contactModel.deleteMany({
        _id: { $in: req.body.contactIds },
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