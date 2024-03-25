const mongoose=require('mongoose')
const departmentSchema=mongoose.Schema({
    department_name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    created_date:{
        type:String,
        required:true
    },
})


const Department=mongoose.model('Department',departmentSchema);
module.exports=Department;