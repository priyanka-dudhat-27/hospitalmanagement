const Admin=require('../models/adminModel')
const doctorModel=require('../models/doctor_detailsModel');
const path=require('path')
const fs=require('fs')
module.exports.login=async(req,res)=>{
    return res.render('login');
}
module.exports.signIn=async(req,res)=>{
    try{
        console.log('login successfully')
        return res.redirect('/admin/dashboard')
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}
module.exports.dashboard=async(req,res)=>{
    let adminData=await Admin.find().countDocuments();
    let doctorData=await doctorModel.find().countDocuments();

    return res.render('dashboard',{
        adminData:adminData,
        doctorData:doctorData,
    });
}
module.exports.add_admin=async(req,res)=>{
    return res.render('add_admin');
}

module.exports.insert_adminData=async(req,res)=>{
    console.log(req.body);
    console.log(req.file);  
    try{
        var img='';
        if(req.file){
            img=Admin.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;

        let adminData=await Admin.create(req.body);
        if(adminData){
            console.log('record inserted successfully');
            return res.redirect('back')
        }else{
            console.log('something wrong')          
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}

module.exports.view_admin=async(req,res)=>{
    try{
        let viewData=await Admin.find({});
        return res.render('view_admin',{
            adminData:viewData,
        });
    }
    catch(err){
        console.log('something wrong')            
        return res.redirect('back');
    }
}

module.exports.deleteRecord=async(req,res)=>{
    try{
        let singleData=await Admin.findById(req.params.id);
        if(singleData){
            let imagePath=path.join(__dirname,'..',singleData.image)
            await fs.unlinkSync(imagePath)
        }else{
            console.log('wrong')
            return res.redirect('back')
        }
        let delData=await Admin.findByIdAndDelete(req.params.id);
        if(delData){
            console.log('Record deleted successfully')            
            return res.redirect('/admin/view_admin')
        }else{
            console.log('something wrong')            
        }
    }
    catch(err){
        console.log(err)            
        return res.redirect('back');
    }
}
module.exports.updateRecord=async(req,res)=>{
    try{
        let singleData=await Admin.findById(req.params.id);
        return res.render('edit_admin',{
            adminData:singleData,
        })
    }catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}
module.exports.edit_admin=async(req,res)=>{
    try{
        if(req.file){
            let findData=await Admin.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            var img='';
            req.body.image=Admin.iPath+'/'+req.file.filename;
        }
        else{
            let findData=await Admin.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
                req.body.name=req.body.fname+' '+req.body.lname;
            }
        }
        await Admin.findByIdAndUpdate(req.params.id,req.body);
        console.log('Record updated successfully')            
        return res.redirect('/admin/view_admin');
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}
