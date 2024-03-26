const passport=require('passport')
const localStretegy=require('passport-local').Strategy;
const Admin=require('../models/adminModel')
const Doctor=require('../models/doctor_detailsModel')
const Reception=require('../models/receptionModel')


passport.use(new localStretegy({
    usernameField:"email",
},async function(email,password,done){
    let checkEmail=await Admin.findOne({email:email});
    let checkDoctorEmail=await Doctor.findOne({email:email});
    let checkReceptionEmail=await Reception.findOne({email:email});
    if(checkEmail){
        if(checkEmail.status === true){
            if(checkEmail.password==password){
                return done(null,checkEmail)
            }else{
                return done(null,false)
            }
        }
        else{
            console.log('user deactived')

            return done(null,false)
        }
    }else if(checkDoctorEmail){
        if(checkDoctorEmail.status === true){
            if(checkDoctorEmail.password==password){
                return done(null,checkDoctorEmail)
            }else{
                return done(null,false)
            }
        }
        else{
            console.log('user deactived')

            return done(null,false)
        }
    }
    else if(checkReceptionEmail){
        if(checkReceptionEmail.status === true){
            if(checkReceptionEmail.password==password){
                return done(null,checkReceptionEmail)
            }else{
                return done(null,false)
            }
        }
        else{
            console.log('user deactived')

            return done(null,false)
        }
    }
    else{
        return done(null,false)
    }
}))

passport.serializeUser((user,done)=>{
    console.log(user);
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let adminData=await Admin.findById(id);
    let doctorData=await Doctor.findById(id);
    let receptionData=await Reception.findById(id);
    if(adminData){
        return done(null,adminData)
    }else if(doctorData){
        return done(null,doctorData)
    }else if(receptionData){
        return done(null,receptionData)
    }
    else{
        return done(null,false)
    }
})

passport.setAuth=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.admin=req.user;
    }
    next();
}
passport.checkAuth=function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/main')
    }
}

module.exports=passport;