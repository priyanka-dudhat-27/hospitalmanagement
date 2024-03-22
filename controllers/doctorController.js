const doctor_detailsModel=require('../models/doctor_detailsModel')

module.exports.login=async(req,res)=>{
    try {
        return res.render('loginDoctor')
    } catch (err) {
        console.log(err)
        req.flash('error','something wrong');                 
        return res.redirect('back')
    }
}
module.exports.dashboardDoctor=async(req,res)=>{
    try {
        return res.render('dashboardDoctor')
    } catch (err) {
        console.log(err)
        req.flash('error','something wrong');                 
        return res.redirect('back')
    }
}
module.exports.signIn=async(req,res)=>{
    try{
        let checkEmail = await doctor_detailsModel.findOne({email:req.body.email})
        if(checkEmail){
            if(checkEmail.password==req.body.password){
                req.flash('success','Login successfully');         
                return res.redirect('/doctor/dashboardDoctor')
            }
            else{
                req.flash('error','Wrong password');         
                return res.redirect('back')
            }
        }else{
            req.flash('error','Wrong Email');         
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err)    
        req.flash('error','something wrong');                 
        return res.redirect('back')
    }
}