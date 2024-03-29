const servicesModel=require('../models/servicesModel')
const path=require('path')
const fs=require('fs')

module.exports.add_services=async(req,res)=>{
    try {
        return res.render('add_services')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}


module.exports.insert_servicesData = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
      var img = "";
      if (req.file) {
        img = servicesModel.iPath + "/" + req.file.filename;
      }
      req.body.image = img;
      req.body.status = true;
  
      let servicesData = await servicesModel.create(req.body);
      if (servicesData) {
        req.flash("success", "service record added successfully");
        return res.redirect("/admin/services/view_services");
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
  
  module.exports.view_services = async (req, res) => {
    try {
      // console.log(req.query.page);
      var page = 0;
      var per_page = 5;
  
      // console.log(req.query.search)
      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      let allRecord = await servicesModel.find( { title: { $regex: search, $options: "i" } }).countDocuments();
      let totalpage = Math.ceil(allRecord / per_page);
      console.log(totalpage);
  
      if (req.query.page) {
        page = req.query.page;
      }
  
      let viewData = await servicesModel.find({ title: { $regex: search, $options: "i" } })
        .skip(page * per_page)
        .limit(per_page);
  
      if (viewData) {
        return res.render("view_services", {
          servicesData: viewData,
          search: search,
          totalpage: totalpage,
          currentPage: page,
          per_page: per_page,

        });
      } else {
        req.flash("error", "something wrong");
        return res.redirect("/main");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  
  module.exports.deleteRecord = async (req, res) => {
    try {
        // Retrieve the record from the database
        let singleData = await servicesModel.findById(req.params.id);

        // Check if the record exists
        if (!singleData) {
            console.log("Record not found");
            req.flash("error", "Record not found");
            return res.redirect("back");
        }

        // Construct the file path for the associated image
        let imagePath = path.join(__dirname, "..", singleData.image);

        // Check if the image file exists before attempting to delete it
        if (fs.existsSync(imagePath)) {
            // Delete the image file from the file system
            fs.unlinkSync(imagePath);
        } else {
            console.log("Image file not found");
            req.flash("error", "Image file not found");
        }

        // Delete the record from the database
        await servicesModel.findByIdAndDelete(req.params.id);

        // Redirect with success message
        req.flash("success", "Record deleted successfully");
        return res.redirect("/admin/services/view_services");
    } catch (err) {
        console.error("Error deleting record:", err);
        req.flash("error", "Something went wrong while deleting the record");
        return res.redirect("back");
    }
};
  module.exports.updateRecord = async (req, res) => {
    try {
      let singleData = await servicesModel.findById(req.params.id);
      return res.render("edit_services", {
        servicesData: singleData,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  module.exports.edit_services = async (req, res) => {
    try {
      if (req.file) {
        let findData = await servicesModel.findById(req.params.id);
        if (findData) {
          let imagePath = path.join(__dirname, "..", findData.image);
          await fs.unlinkSync(imagePath);
        }
        var img = "";
        req.body.image = servicesModel.iPath + "/" + req.file.filename;
      } else {
        let findData = await servicesModel.findById(req.params.id);
        if (findData) {
          req.body.image = findData.image;
        }
      }
      await servicesModel.findByIdAndUpdate(req.params.id, req.body);
      req.flash("success", "Record updated successfully");
      return res.redirect("/admin/services/view_services");
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  
  // status active-deactive
module.exports.deactive = async (req, res) => {
    try {
      let serviceDeactive = await servicesModel.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (serviceDeactive) {
        req.flash("success", "Service deactivated successfully");
        return res.redirect("/admin/services/view_services");
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
      let serviceActive = await servicesModel.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (serviceActive) {
        req.flash("success", "Service activated successfully");
        return res.redirect("/admin/services/view_services");
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
      let d = await servicesModel.deleteMany({ _id: { $in: req.body.servicesIds } });
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