const appointmentModel=require('../models/appointmentModel')

module.exports.login = async (req, res) => {
  return res.render("loginReception");
};
module.exports.dashboardDoctor = async (req, res) => {
  return res.render("dashboardReception");
};
module.exports.signIn = async (req, res) => {
  try {
    console.log("login successfully");
    return res.redirect("/reception/dashboardReception");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

module.exports.book_appointment = async (req, res) => {
    try {
        return res.render("book_appointment");
    } catch (err) {
        console.log(err);
    }
};

module.exports.add_appointment=async(req,res)=>{
    // console.log(req.body);

    req.body.name=req.body.fname+' '+req.body.lname;

    try {
        let appointmentData=await appointmentModel.create(req.body);
        if(appointmentData){
            console.log('appointment record inserted successfully');
            return res.redirect('back')
        }else{
            console.log('something wrong')          
            return res.redirect('back')
        }
    } catch (err) {
        console.log(err);
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
        return res.redirect('back');
    }
}

module.exports.deleteRecord=async(req,res)=>{
    try{
        let delData=await appointmentModel.findByIdAndDelete(req.params.id);
        if(delData){
            console.log('Record deleted successfully')            
            return res.redirect('/reception/view_appointment')
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
        console.log('Appointment record updated successfully')            
        return res.redirect('/reception/view_appointment');
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}