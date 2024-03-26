const departmentModel=require('../models/departmentModel')
const moment=require('moment')
module.exports.add_department=async(req,res)=>{
    try {
        return res.render('add_department')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}

module.exports.insert_department=async(req,res)=>{
    try {
        req.body.status = true;
        req.body.created_date = moment().format('LLL')
        let departData = await departmentModel.create(req.body);
        if (departData) {
          req.flash("success", "Department added successfully");
          return res.redirect("/admin/department/view_department");
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
module.exports.view_department = async (req, res) => {
    try {
      // console.log(req.query.page);
      var page = 0;
      var per_page = 5;
  
      // console.log(req.query.search)
      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      let allRecord = await departmentModel.find({ department_name: { $regex: search, $options: "i" } }).countDocuments();
      let totalpage = Math.ceil(allRecord / per_page);
      console.log(totalpage);
  
      if (req.query.page) {
        page = req.query.page;
      }
  
      let viewData = await departmentModel.find({ department_name: { $regex: search, $options: "i" } })
        .skip(page * per_page)
        .limit(per_page);
  
      if (viewData) {
        return res.render("view_department", {
          departmentData: viewData,
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
      let delData = await departmentModel.findByIdAndDelete(req.params.id);
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
      let singleData = await departmentModel.findById(req.params.id);
      return res.render("edit_department", {
        departmentData: singleData,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  module.exports.edit_department = async (req, res) => {
    try {
      let departData=await departmentModel.findByIdAndUpdate(req.params.id, req.body);
      if (departData) {
        req.flash("success", "Department updated successfully");
        return res.redirect("/admin/department/view_department");
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
      let depDeactive = await departmentModel.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (depDeactive) {
        req.flash("success", "Department deactivated successfully");
        return res.redirect("/admin/department/view_department");
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
      let departmentActive = await departmentModel.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (departmentActive) {
        req.flash("success", "Department activated successfully");
        return res.redirect("/admin/department/view_department");
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
      let d = await departmentModel.deleteMany({ _id: { $in: req.body.depIds } });
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
  