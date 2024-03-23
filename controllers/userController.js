module.exports.home=async(req,res)=>{
    try {
        return res.render('userpanel/home')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.appointment=async(req,res)=>{
    try {
        return res.render('userpanel/appointment')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.about=async(req,res)=>{
    try {
        return res.render('userpanel/about')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.services=async(req,res)=>{
    try {
        return res.render('userpanel/services')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.doctors=async(req,res)=>{
    try {
        return res.render('userpanel/doctors')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}
module.exports.contact=async(req,res)=>{
    try {
        return res.render('userpanel/contact')
    } catch (err) {
        console.log(err);
        req.flash('error','something wrong')
        return res.redirect('back')
    }
}