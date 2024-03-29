const mongoose=require('mongoose')
const postCatSchema=mongoose.Schema({
    category_name:{
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


const postCategory=mongoose.model('postCategory',postCatSchema);
module.exports=postCategory;