const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const imgPath='/uploads/admins'

const adminSchema=mongoose.Schema({
    name:{
        type:String,
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
    message:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    gender:{
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

adminSchema.statics.uploadImage=multer({storage:storageData}).single('image');
adminSchema.statics.iPath=imgPath;

const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;