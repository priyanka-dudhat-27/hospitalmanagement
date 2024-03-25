const mongoose=require('mongoose')
const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
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
    created_date:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
})


const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;