const postcatModel=require('../models/postcatModel')
const moment=require('moment')
module.exports.add_postcat=async(req,res)=>{
    try {
        return res.render('add_postcat')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}

module.exports.insert_postcat=async(req,res)=>{
    try {
        req.body.status = true;
        req.body.created_date = moment().format('LLL')
        let postcatData = await postcatModel.create(req.body);
        if (postcatData) {
          req.flash("success", "Post category added successfully");
          return res.redirect("/admin/postcat/view_postcat");
        } else {
          req.flash("error", "something wrong");
          return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.view_postcat = async (req, res) => {
    try {
      // console.log(req.query.page);
      var page = 0;
      var per_page = 5;
  
      // console.log(req.query.search)
      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      let allRecord = await postcatModel.find({ category_name: { $regex: search, $options: "i" } }).countDocuments();
      let totalpage = Math.ceil(allRecord / per_page);
      console.log(totalpage);
  
      if (req.query.page) {
        page = req.query.page;
      }
  
      let viewData = await postcatModel.find({ category_name: { $regex: search, $options: "i" } })
        .skip(page * per_page)
        .limit(per_page);
  
      if (viewData) {
        return res.render("view_postcat", {
          postcatData: viewData,
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
      let delData = await postcatModel.findByIdAndDelete(req.params.id);
      if (delData) {
        req.flash("success", "record deleted successfully");
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
  module.exports.updateRecord = async (req, res) => {
    try {
      let singleData = await postcatModel.findById(req.params.id);
      return res.render("edit_postcat", {
        postcatData: singleData,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  module.exports.edit_postcat = async (req, res) => {
    try {
      let postcatData=await postcatModel.findByIdAndUpdate(req.params.id, req.body);
      if (postcatData) {
        req.flash("success", "Post category updated successfully");
        return res.redirect("/admin/postcat/view_postcat");
      }else{
        req.flash("error", "Something went wrong");
        return res.redirect("back");
      }
  } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      return res.redirect("back");
  }
  };
  
  // status active-deactive
module.exports.deactive = async (req, res) => {
    try {
      let postcatDeactive = await postcatModel.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (postcatDeactive) {
        req.flash("success", "Department deactivated successfully");
        return res.redirect("/admin/postcat/view_postcat");
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
      let postcatActive = await postcatModel.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (postcatActive) {
        req.flash("success", "Post category activated successfully");
        return res.redirect("/admin/postcat/view_postcat");
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
      let d = await postcatModel.deleteMany({ _id: { $in: req.body.catIds } });
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
  