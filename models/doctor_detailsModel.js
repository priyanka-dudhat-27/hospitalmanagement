const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const imgPath='/uploads/doctors'

const doctor_detailsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    speciality:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }  
})


const storageData=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',imgPath))
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})

doctor_detailsSchema.statics.uploadImage=multer({storage:storageData}).single('image');
doctor_detailsSchema.statics.iPath=imgPath;

const Doctor_details=mongoose.model('Doctor_details',doctor_detailsSchema);
module.exports=Doctor_details;