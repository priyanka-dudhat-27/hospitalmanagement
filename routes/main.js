const express=require('express');
const routs=express();

routs.get('/',async(req,res)=>{
    return res.render('main');
})

module.exports=routs;