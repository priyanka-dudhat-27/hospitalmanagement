const mongoose=require('mongoose')
const appointmentSchema=mongoose.Schema({
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
    service:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    email:{
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
    }
   
})


const Appointment=mongoose.model('Appointment',appointmentSchema);
module.exports=Appointment;