const commentModel = require('../models/commentModel');
const path=require('path')
const fs = require('fs')

module.exports.view_comments = async (req, res) => {
    try {
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        let page = 0;
        let per_page = 5;
        if (req.query.page) {
            page = req.query.page;
        }
        let allrecord = await commentModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        }).countDocuments();
        let totalPage = Math.ceil(allrecord / per_page);
        let commentRecord = await commentModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        }).skip(page * per_page)
            .limit(per_page);
        
        if (commentRecord) { 
            return res.render('view_comments', {
                commentData: commentRecord,  
                search: search,
                totalPage: totalPage,
                per_page: per_page,
                currentPage: page,
            });
        } else {
            req.flash('error', 'something went wrong');
            return res.redirect('back');
        }

    } catch (err) {
        console.log(err);
        req.flash('error', 'Error');
        return res.redirect('back');
    }
}

module.exports.deleteRecord = async (req, res) => {
  try {
    let singleData = await commentModel.findById(req.params.id);
    if (singleData) {
      let imagePath = path.join(__dirname, "..", singleData.commentImage);
      await fs.unlinkSync(imagePath);
    } else {
      console.log("wrong");
      return res.redirect("back");
    }
    let delData = await commentModel.findByIdAndDelete(req.params.id);
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

// status active-deactive
module.exports.deactive = async (req, res) => {
    try {
      let commentDeactive = await commentModel.findByIdAndUpdate(req.params.id, {
        status: false,
      });
      if (commentDeactive) {
        req.flash("success", "Comment deactivated successfully");
        return res.redirect("/admin/comment/view_comments");
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
      let commentActive = await commentModel.findByIdAndUpdate(req.params.id, {
        status: true,
      });
      if (commentActive) {
        req.flash("success", "Comment activated successfully");
        return res.redirect("/admin/comment/view_comments");
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
      let d = await commentModel.deleteMany({ _id: { $in: req.body.commentIds } });
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
  
  // delete multiple records
module.exports.deleteMultiple = async (req, res) => {
  try {
    let d = await commentModel.deleteMany({ _id: { $in: req.body.commentIds } });
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
