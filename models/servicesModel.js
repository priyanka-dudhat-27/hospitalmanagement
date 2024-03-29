const mongoose=require('mongoose')
const multer=require('multer')
const path=require('path')
const imgPath='/uploads/services'

const serviceSchema=mongoose.Schema({
    image:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
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

serviceSchema.statics.uploadImage=multer({storage:storageData}).single('image');
serviceSchema.statics.iPath=imgPath;

const Service=mongoose.model('Service',serviceSchema);
module.exports=Service;