const postsModel=require('../models/postsModel')
const postcatModel=require('../models/postcatModel')
const moment=require('moment')
const path=require('path')
const fs=require('fs')
module.exports.add_posts = async (req, res) => {
    try {
      let postcatData=await postcatModel.find();
      return res.render("add_posts",{
        postcatData:postcatData
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
    }
  };
  
  module.exports.insert_postsData = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
      var img = "";
      if (req.file) {
        img = postsModel.iPath + "/" + req.file.filename;
      }
    
      req.body.postsimage = img;
      req.body.status = true;
      req.body.created_date=moment().format('LLL');
      
  
      let postsData = await postsModel.create(req.body);
      if (postsData) {
        req.flash("success", "post record added successfully");
        return res.redirect("/admin/posts/add_posts");
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
  
  module.exports.view_posts = async (req, res) => {
    try {
      // console.log(req.query.page);
      var page = 0;
      var per_page = 5;
  
      // console.log(req.query.search)
      var search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      let allRecord = await postsModel.find( { title: { $regex: search, $options: "i" } },
      ).countDocuments();
      let totalpage = Math.ceil(allRecord / per_page);
      console.log(totalpage);
  
      if (req.query.page) {
        page = req.query.page;
      }
  
      let viewData = await postsModel.find( { title: { $regex: search, $options: "i" } },)
        .skip(page * per_page)
        .limit(per_page);
  
      if (viewData) {
        return res.render("view_posts", {
          postsData: viewData,
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
      let singleData = await postsModel.findById(req.params.id);
      if (!singleData) {
        console.log("Record not found");
        return res.redirect("back");
      }
  
      if (singleData.image) {
        let imagePath = path.join(__dirname, "..", singleData.image);
        await fs.unlinkSync(imagePath);
      } else {
        console.log("Image path not found");
      }
  
      let delData = await postsModel.findByIdAndDelete(req.params.id);
      if (delData) {
        req.flash("success", "Record deleted successfully");
        return res.redirect("/admin/posts/view_posts");
      } else {
        req.flash("error", "Failed to delete record");
        return res.redirect("back");
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something went wrong");
      return res.redirect("back");
    }
  };
  
  module.exports.updateRecord = async (req, res) => {
    try {
      let singleData = await postsModel.findById(req.params.id);
      return res.render("edit_posts", {
        postsData: singleData,
      });
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  module.exports.edit_posts = async (req, res) => {
    try {
      if (req.file) {
        let findData = await postsModel.findById(req.params.id);
        if (findData) {
          let imagePath = path.join(__dirname, "..", findData.image);
          await fs.unlinkSync(imagePath);
        }
        var img = "";
        req.body.postsimage = postsModel.iPath + "/" + req.file.filename;
      } else {
        let findData = await postsModel.findById(req.params.id);
        if (findData) {
          req.body.postsimage = findData.image;
        }
      }
      await postsModel.findByIdAndUpdate(req.params.id, req.body);
      req.flash("success", "Record updated successfully");
      return res.redirect("/admin/posts/view_posts");
    } catch (err) {
      console.log(err);
      req.flash("error", "something wrong");
      return res.redirect("back");
    }
  };
  module.exports.deactive = async (req, res) => {
    try {
      let postDeactive = await postsModel.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (postDeactive) {
        req.flash("success", "Post deactivated successfully");
        return res.redirect("/admin/posts/view_posts");
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
      let postActive = await postsModel.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (postActive) {
        req.flash("success", "Admin activated successfully");
        return res.redirect("/admin/posts/view_posts");
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
      let d = await postsModel.deleteMany({ _id: { $in: req.body.postsIds } });
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
  