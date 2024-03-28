// live link:
// https://hospitalmanagement-ck74.onrender.com/doctors

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const path = require('path');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local'); 
const session = require('express-session');
const passport = require('passport'); 
const connectFlash=require('connect-flash');
const customFlash=require('./config/customFlash')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'assets_user')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    name: 'RnW',
    secret: "akshar",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 100 * 60 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth);

app.use(connectFlash());
app.use(customFlash.setFlash);


app.use('/', require('./routes/index'));

app.listen(port, async (err) => {
    (err) ? console.log('Something Wrong !') : console.log(`Server is running on port ${port}`);
});
