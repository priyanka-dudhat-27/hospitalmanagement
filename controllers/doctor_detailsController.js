const doctor_detailsModel = require("../models/doctor_detailsModel");
const path=require('path');
const fs=require('fs');

module.exports.add_doctor=async(req,res)=>{
 
    return res.render('add_doctor')
}
module.exports.insert_doctor=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file);  
    try{
        var img='';
        if(req.file){
            img=doctor_detailsModel.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;
        req.body.status=true;

        let doctor_detailsData=await doctor_detailsModel.create(req.body);
        if(doctor_detailsData){
            req.flash('success','Doctor record created successfully');         
            return res.redirect('/admin/doctor_details/view_doctor')
        }else{
            req.flash('error','something wrong');         
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err)       
        req.flash('error','something wrong');              
        return res.redirect('back')
    }
}
module.exports.view_doctor=async(req,res)=>{
    try{
        let viewData=await doctor_detailsModel.find({});
        return res.render('view_doctor',{
            doctor_detailsData:viewData,
        });
    }
    catch(err){
        console.log(err)            
        req.flash('error','something wrong');         
        return res.redirect('back');
    }
}
module.exports.profile=async(req,res)=>{
   try {
    // console.log(req.params.id);
    let singleData=await doctor_detailsModel.findById(req.params.id);
    if(singleData){
        return res.render('profile_doctor',{
            singleData:singleData,
        })
    }else{
        req.flash('error','profile not found');         
        return res.redirect('back')
    }
   } catch (err) {
        console.log(err);
        req.flash('error','something wrong');         
        return res.redirect('back')
   }
}

module.exports.deleteRecord=async(req,res)=>{
    try{
        let singleData=await doctor_detailsModel.findById(req.params.id);
        if(singleData){
            let imagePath=path.join(__dirname,'..',singleData.image)
            await fs.unlinkSync(imagePath)
        }else{
            console.log('wrong')
            return res.redirect('back')
        }
        let delData=await doctor_detailsModel.findByIdAndDelete(req.params.id);
        if(delData){
            req.flash('success','Record deleted successfully');         
            return res.redirect('back')
        }else{
            console.log('something wrong')            
        }
    }
    catch(err){
        console.log(err)      
        req.flash('error','something wrong');               
        return res.redirect('back');
    }
}

module.exports.updateRecord=async(req,res)=>{
    try{
        let singleData=await doctor_detailsModel.findById(req.params.id);
        return res.render('edit_doctor',{
            singleData:singleData,
        })
    }catch(err){
        console.log(err)           
        req.flash('error','something wrong');          
        return res.redirect('back')
    }
}

module.exports.edit_doctor=async(req,res)=>{
    try{
        if(req.file){
            let findData=await doctor_detailsModel.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            var img='';
            req.body.image=doctor_detailsModel.iPath+'/'+req.file.filename;
        }
        else{
            let findData=await doctor_detailsModel.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
                req.body.name=req.body.fname+' '+req.body.lname;
            }
        }
        await doctor_detailsModel.findByIdAndUpdate(req.params.id,req.body);
        req.flash('success','Doctor record updated successfully');         
        return res.redirect('/admin/doctor_details/view_doctor');
    }
    catch(err){
        console.log(err)            
        req.flash('error','something wrong');         
        return res.redirect('back')
    }
}

// status active-deactive 
module.exports.deactive=async(req,res)=>{
    try {
        let doctorDeactive=await doctor_detailsModel.findByIdAndUpdate(req.params.id,{status:false})
        if(doctorDeactive){
            req.flash('success','Doctor deactivated successfully');
            return res.redirect('back');
        }else{
            req.flash('error','something wrong');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        req.flash('error', 'something wrong');
        return res.redirect('back');
    }
}
module.exports.active=async(req,res)=>{
    try {
        let doctorActive=await doctor_detailsModel.findByIdAndUpdate(req.params.id,{status:true})
        if(doctorActive){
            req.flash('success','Doctor activated successfully');
            return res.redirect('back');
        }else{
            req.flash('error','something wrong');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        req.flash('error', 'something wrong');
        return res.redirect('back');
    }
}

// multiple doctor records delete

module.exports.deleteMultiple = async (req, res) => {
    try {
      let d = await doctor_detailsModel.deleteMany({_id: { $in: req.body.doctorIds },
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