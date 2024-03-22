const appointmentModel=require('../models/appointmentModel')
const receptionModel=require('../models/receptionModel')
const path=require('path')
const fs=require('fs')
module.exports.login = async (req, res) => {
  return res.render("loginReception");
};
module.exports.dashboardDoctor = async (req, res) => {

    let appointmentData=await appointmentModel.find().countDocuments();

    return res.render("dashboardReception",{
        appointmentData:appointmentData,
    });
};
module.exports.signIn = async (req, res) => {
  try {
    req.flash('success','login successfully');         
    return res.redirect("/reception/dashboardReception");
  } catch (err) {
    console.log(err);
    req.flash('error','something wrong');         
    return res.redirect("back");
  }
};

module.exports.book_appointment = async (req, res) => {
    try {
        return res.render("book_appointment");
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong');         
        return res.render('back');
    }
};

module.exports.add_appointment=async(req,res)=>{
    // console.log(req.body);

    req.body.name=req.body.fname+' '+req.body.lname;

    try {
        let appointmentData=await appointmentModel.create(req.body);
        if(appointmentData){
            req.flash('success','Appointment created successfully');         
            return res.redirect('back')
        }else{
            req.flash('error','something wrong');         
            return res.redirect('back')
        }
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong');         
        return res.redirect('back')
    }
}

module.exports.view_appointment=async(req,res)=>{
    try{
        let viewData=await appointmentModel.find({});
        return res.render('view_appointment',{
            appointmentData:viewData,
        });
    }
    catch(err){
        console.log(err)      
        req.flash('error','something wrong');               
        return res.redirect('back');
    }
}

module.exports.deleteRecord=async(req,res)=>{
    try{
        let delData=await appointmentModel.findByIdAndDelete(req.params.id);
        if(delData){
            req.flash('success','Record deleted successfully');         
            return res.redirect('/reception/view_appointment')
        }else{
            req.flash('error','something wrong'); 
            return res.redirect('back');        
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
        let singleData=await appointmentModel.findById(req.params.id);
        return res.render('edit_appointment',{
            appointmentData:singleData,
        })
    }catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}


module.exports.edit_appointment=async(req,res)=>{
    try{
        req.body.name=req.body.fname+' '+req.body.lname;

        await appointmentModel.findByIdAndUpdate(req.params.id,req.body);

        req.flash('success','Appointment updated successfully');         
        return res.redirect('/reception/view_appointment');
    }
    catch(err){
        console.log(err)        
        req.flash('error','something wrong');             
        return res.redirect('back')
    }
}

// receptionist_details
module.exports.add_reception=async(req,res)=>{
    try {
        return res.render('add_reception');
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong');         
        return res.render('back');
    }
}

module.exports.insert_reception_details=async(req,res)=>{
   
    try{
        // console.log(req.body);
        // console.log(req.file);  
        var img='';
        if(req.file){
            img=receptionModel.iPath+'/'+req.file.filename;
        }
        req.body.name=req.body.fname+' '+req.body.lname;
        req.body.image=img;

        let receptionData=await receptionModel.create(req.body);
        if(receptionData){
            req.flash('success','Record created successfully');         
            return res.redirect('back')
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


module.exports.view_reception=async(req,res)=>{
    try{
        let viewData=await receptionModel.find({});
        return res.render('view_reception',{
            receptionData:viewData,
        });
    }
    catch(err){
        console.log(err)        
        req.flash('error','something wrong');             
        return res.redirect('back');
    }
}

module.exports.deleteRecord=async(req,res)=>{
    try{
        let singleData=await receptionModel.findById(req.params.id);
        if(singleData){
            let imagePath=path.join(__dirname,'..',singleData.image)
            await fs.unlinkSync(imagePath)
        }else{
            console.log('wrong')
            req.flash('error','something wrong');         
            return res.redirect('back')
        }
        let delData=await receptionModel.findByIdAndDelete(req.params.id);
        if(delData){
            req.flash('success','Record deleted successfully');         
            return res.redirect('/reception/view_reception')
        }else{
            req.flash('error','something wrong');   
            return res.redirect('back');      
        }
    }
    catch(err){
        console.log(err)            
        return res.redirect('back');
    }
}

module.exports.updateRecord=async(req,res)=>{
    try{
        let singleData=await receptionModel.findById(req.params.id);
        return res.render('edit_reception',{
            receptionData:singleData,
        })
    }catch(err){
        console.log(err)     
        req.flash('error','something wrong');                
        return res.redirect('back')
    }
}
module.exports.edit_reception=async(req,res)=>{
    try{
        // console.log(req.body)
        // console.log(req.file)
        if(req.file){
            let findData=await receptionModel.findById(req.params.id);
            if(findData){
                let imagePath=path.join(__dirname,'..',findData.image);
                await fs.unlinkSync(imagePath);
            }
            var img='';
            req.body.image=receptionModel.iPath+'/'+req.file.filename;
        }
        else{
            let findData=await receptionModel.findById(req.params.id);
            if(findData){
                req.body.image=findData.image;
                req.body.name=req.body.fname+' '+req.body.lname;
            }
        }
        await receptionModel.findByIdAndUpdate(req.params.id,req.body);
        req.flash('success','Record updated successfully');         
        return res.redirect('/reception/view_reception');
    }
    catch(err){
        console.log(err)       
        req.flash('error','something wrong');              
        return res.redirect('back')
    }
}
