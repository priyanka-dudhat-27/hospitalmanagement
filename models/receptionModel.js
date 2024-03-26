const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const imgPath='/uploads/receptions'

const receptionSchema=mongoose.Schema({
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
    },
    status:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        enum:['receptionist'],
        default:'receptionist'
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

receptionSchema.statics.uploadImage=multer({storage:storageData}).single('image');
receptionSchema.statics.iPath=imgPath;

const Reception=mongoose.model('Reception',receptionSchema);
module.exports=Reception;