const cookieParser = require("cookie-parser");
const express=require("express");
const app=express();
app.use(cookieParser("secretcode"));
const session=require("express-session");
app.use(session({secret: "supersecretkey",resave: false,saveUninitialized:true}));
const flash=require("connect-flash")
app.use(flash());


app.get("/getcookies", async(req,resp)=>{
    resp.cookie("greet","hi");
    resp.cookie("origin","india");//these cookies help in tracking and all!once called reamins throught every page
    resp.send("we server sent u a cookie!")
})
app.get("/",async(req,resp)=>{
    resp.send("hi i am root of 3000");
    console.dir(req.cookies)
})
app.get("/greet",async(req,resp)=>{
    let {origin="anonymous"}=req.cookies;
    resp.send(`hi, ${origin}`);
})

app.get("/signedcookie", async (req,resp)=>{
    resp.cookie("madein","US",{ signed:true });
    resp.send("hihi")
    console.log(req.signedCookies);
});
app.get("/verify",async(req,resp)=>{
    console.log(req.cookies);
    console.log(req.signedCookies)
    resp.send("verified");
});
//session
app.get("/test",async(req,resp)=>{
    resp.send("test of session was successful!");

})
//expresss session storing in temporary storage kindoff stateful only!
app.get("/getcnts",async(req,resp)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    resp.send(`you have requested ${req.session.count} time`);
})

//see trcaking ofinfo diff routes
app.get("/register",async(req,resp)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    resp.redirect("hello");

})
app.get("/hello",async(req,resp)=>{
    resp.send(`hello ${req.session.name}!`);
})
//trying flsh
app.get("/setflash", (req, res) => {
    req.flash("success", "Flash message created!");
    res.redirect("/showflash");
});

app.get("/showflash", (req, res) => {
    let message = req.flash("success");

    console.log(message);

    res.send(`Message: ${message}`);
});
//What is res.locals?   
// Think of it as:
// Data attached to the response that is automatically available to the EJS template.res.locals.name as name 
app.listen(3000,()=>{
    console.log("hhi we are 3000");
})