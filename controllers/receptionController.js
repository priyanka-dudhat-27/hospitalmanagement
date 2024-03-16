module.exports.login=async(req,res)=>{
    return res.render('loginReception')
}
module.exports.dashboardDoctor=async(req,res)=>{
    return res.render('dashboardReception')
}
module.exports.signIn=async(req,res)=>{
    try{
        console.log('login successfully')
        return res.redirect('/reception/dashboardReception')
    }
    catch(err){
        console.log(err)            
        return res.redirect('back')
    }
}