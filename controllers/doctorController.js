const doctor_detailsModel=require('../models/doctor_detailsModel')

module.exports.login=async(req,res)=>{
    return res.render('loginDoctor')
}
module.exports.dashboardDoctor=async(req,res)=>{
    return res.render('dashboardDoctor')
}
module.exports.signIn=async(req,res)=>{
    try{
        let checkEmail = await doctor_detailsModel.findOne({email:req.body.email})
        if(checkEmail){
            if(checkEmail.password==req.body.password){
                console.log('login successfully')
                return res.redirect('/doctor/dashboardDoctor')
            }
            else{
                console.log('wrong password')
                return res.redirect('back')
            }
        }else{
            console.log('wrong email')
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}