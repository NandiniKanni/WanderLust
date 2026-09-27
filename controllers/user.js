const User = require("../models/user.js");


// SHOW SIGNUP PAGE
module.exports.showSignup = async (req, resp) => {

    resp.render("../users/signup.ejs");

};


// SIGNUP
module.exports.signup = async (req, resp, next) => {

    let { username, email, password } = req.body;

    const newuser = { username, email };

    // Create the user
    let registereduser = await User.register(newuser, password);

    console.log(registereduser);

    // Automatically log in after signup
    req.login(registereduser, (err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "welcome to wanderlust!");

        resp.redirect("/listings");
    });

};


// SHOW LOGIN PAGE
module.exports.showLogin = async (req, resp) => {

    resp.render("../users/login.ejs");

};


// LOGIN
module.exports.login = async (req, res) => {

    req.flash("success", "Welcome back to Wanderlust!");

    // Redirect user to the page they originally wanted
    let redirectUrl = res.locals.redirecturl || "/listings";

    res.redirect(redirectUrl);

};


// LOGOUT
module.exports.logout = (req, res, next) => {

    req.logout((err) => {

        if (err) {
            return next(err);
        }

        req.flash("success", "you are logged out!");

        res.redirect("/listings");
    });

};