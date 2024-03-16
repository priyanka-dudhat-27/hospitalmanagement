module.exports.login=async(req,res)=>{
    return res.render('loginDoctor')
}
module.exports.dashboardDoctor=async(req,res)=>{
    return res.render('dashboardDoctor')
}
module.exports.signIn=async(req,res)=>{
    try{
        console.log('login successfully')
        return res.redirect('/doctor/dashboardDoctor')
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}