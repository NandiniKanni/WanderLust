// const User = require("../models/user.js");
// const express=require("express");
// const router=express.Router();
// const passport=require("passport")
// const { saveRedirectUrl }=require("../middleware.js")

// router.get("/signup",async(req,resp)=>{
//     resp.render("../users/signup.ejs");

// })
// router.post("/signup",async(req,resp)=>{
// let {username,email,password}=req.body
// const newuser=({username,email});
// let registereduser=await User.register(newuser,password);
// console.log(registereduser);
// req.login(registereduser,(err)=>{
//     if(err){
//         return next(err);
//     }
//     else{
//     req.flash("success","welcome to wanderlust!");
//         resp.redirect("/listings");}

// })
// // req.flash("success","welcome to wanderlust!");
// // resp.redirect("/listings");

// })

// router.get("/login",async(req,resp)=>{
//     resp.render("../users/login.ejs");

// })

// router.post("/login",
// passport.authenticate("local",{
// failureRedirect: "/login",
// failureFlash: true,
// }),
// async (req, res) => {
// req.flash("success", "Welcome back to Wanderlust!");
// //hey this res.locals.redirectUrl wont work s mws didnt work if directly logged iin through home pge so check!
// let redirectUrl=res.locals.redirecturl || "/listings";
// res.redirect(redirectUrl);
// }
// );

// router.get("/logout",(req,res,next)=>{
//     req.logout((err)=>{
//         if(err){
//         next(err);
//     }
//     req.flash("success","you are logged out!")
//     res.redirect("/listings")
// })
// });

// module.exports=router;  
const express = require("express");
const router = express.Router();

const passport = require("passport");

const userController = require("../controllers/user.js");


router.route("/signup")
.get(
    userController.showSignup
)
.post(
    userController.signup
);
// SIGNUP PAGE
// SIGNUP

// LOGIN PAGE
router.get(
    "/login",
    userController.showLogin
);


// LOGIN
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);


// LOGOUT
router.get(
    "/logout",
    userController.logout
);


module.exports = router;