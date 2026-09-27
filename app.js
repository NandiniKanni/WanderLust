// if(process.env.NODE_ENV!="production"){
// require("dotenv").config();
// }
// console.log(process.env.SECRET);

// const express=require("express");
// const app=express();

// app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     console.log("REQUEST:", req.method, req.url);
//     console.log("BODY:", req.body);
//     next();
// });
// const mongoose=require("mongoose");   
// const listingModel = require("./models/listing.js");
// const methodoverride = require("method-override");
// app.use(methodoverride("_method"));
// const path = require("path");
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.use(express.static(path.join(__dirname, "css")));
// const ejsmate=require("ejs-mate");
// app.engine("ejs", ejsmate);
// const asyncWrap = require("./utils/wrapAsync.js");
// const Review = require("./models/reviews.js");
// const { listingSchema, reviewSchema} = require("./schema.js");
// console.log("LISTING SCHEMA:", listingSchema);
// console.log("REVIEW SCHEMA:", reviewSchema);
// //app.use(express.static(path.join(__dirname,"css")));    
// app.use(express.static(path.join(__dirname, "public")));
// const ExpressError=require("./utils/ExpressError.js");
// const listingRoutes=require("./routes/listing.js");
// const reviewRoutes=require("./routes/reviews.js");
// const userrouter=require("./routes/user.js")
// const session=require("express-session");
// const MongoStore=require('connect-mongo').MongoStore;
// //const dt={secret: "supersecretkey",resave: false,saveUninitialized:true};
// const dt = {
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true
// };
// const flash=require("connect-flash");
// const passport=require("passport")
// const localStrategy=require("passport-local")
// const User=require("./models/user.js")

// app.use(session(dt));
// app.use(flash());


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new localStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // app.get("/demouser",async (req,resp)=>{
// //     let fakeuser=new User({
// //         email:"student@gmail.com",
// //         username:"nandini"
// //     })
// //     let registereduser=await User.register(fakeuser,"thisispassword")
// //      resp.send(registereduser);
// // });




// app.use((req,resp,next)=>{
//     resp.locals.msg=req.flash("success");
//     resp.locals.error=req.flash("error");
//     resp.locals.currentUser=req.user;
//     //make sure to move to next middleware too!
//     next();

// })
// app.use("/listings",listingRoutes);
// app.use("/listings/:id/reviews",reviewRoutes);
// app.use("/",userrouter);




// //const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
// const mongo_url = process.env.ATLASDB_URL;
// main().then(()=>console.log("connected to db")).catch(err=>console.log(err));
// async function main(){
//     await mongoose.connect(mongo_url);
// }
// const store = MongoStore.create({
//     mongoUrl: mongo_url,
//     crypto: {
//         secret: process.env.SECRET
//     },
//     touchAfter: 24 * 3600
// });

// const sessionoptions = {
//     store: store,
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true
// };
// app.use(session(sessionoptions));
// // main();
// // app.get("/",(req,resp)=>resp.send("hi"))
// app.get("/testlisting",async (req,resp)=>{
//     let samplelisting=new listingModel({
//         title:"My villa",
//         description:"This is by a beach",
//         image:"https://images.unsplash.com/photo-1788031232074-4257be937185?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
//         price:1200,
//         location:"New York",
//         country:"USA"
//     });
//     await samplelisting.save();
//     resp.send("Listing created successfully!");
//     //resp.send(samplelisting)
// });
// // const path = require("path");
// // app.set("view engine","ejs");
// // app.set("views",path.join(__dirname,"views"));


// app.get("/{*splat}", asyncWrap(async (req, resp) => {
//     throw new ExpressError(404, "This is a test error!");
// }));
// app.use((err, req, resp, next) => {
//    //give some default value let { statusCode , message } = err;
//        let { statusCode = 500, message = "Something went wrong!" } = err;

//   resp.status(statusCode).render("error.ejs", {
//         statusCode,
//         message
//     });
//     //resp.status(statusCode).send(message);
// });
// //app.listen(8000,()=>{console.log("server is running on port 8000")})
// app.listen(process.env.PORT || 8000, () => {
//     console.log("server is running");
// });
if(process.env.NODE_ENV!="production"){
require("dotenv").config();
}

const express=require("express");
const app=express();

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("REQUEST:", req.method, req.url);
    console.log("BODY:", req.body);
    next();
});
const mongoose=require("mongoose");   
const listingModel = require("./models/listing.js");
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "css")));
const ejsmate=require("ejs-mate");
app.engine("ejs", ejsmate);
const asyncWrap = require("./utils/wrapAsync.js");
const Review = require("./models/reviews.js");
const { listingSchema, reviewSchema} = require("./schema.js");
console.log("LISTING SCHEMA:", listingSchema);
console.log("REVIEW SCHEMA:", reviewSchema);
//app.use(express.static(path.join(__dirname,"css")));    
app.use(express.static(path.join(__dirname, "public")));
const ExpressError=require("./utils/ExpressError.js");
const listingRoutes=require("./routes/listing.js");
const reviewRoutes=require("./routes/reviews.js");
const userrouter=require("./routes/user.js")

const session=require("express-session");
const MongoStore=require("connect-mongo").MongoStore;

const mongo_url = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: mongo_url,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

const sessionoptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
};

const flash=require("connect-flash");
const passport=require("passport")
const localStrategy=require("passport-local")
const User=require("./models/user.js")

app.use(session(sessionoptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demouser",async (req,resp)=>{
//     let fakeuser=new User({
//         email:"student@gmail.com",
//         username:"nandini"
//     })
//     let registereduser=await User.register(fakeuser,"thisispassword")
//      resp.send(registereduser);
// });




app.use((req,resp,next)=>{
    resp.locals.msg=req.flash("success");
    resp.locals.error=req.flash("error");
    resp.locals.currentUser=req.user;
    //make sure to move to next middleware too!
    next();

})
app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRoutes);
app.use("/",userrouter);




//const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>console.log("connected to db")).catch(err=>console.log(err));
async function main(){
    await mongoose.connect(mongo_url);
}

// main();
// app.get("/",(req,resp)=>resp.send("hi"))

app.get("/testlisting",async (req,resp)=>{
    let samplelisting=new listingModel({
        title:"My villa",
        description:"This is by a beach",
        image:"https://images.unsplash.com/photo-1788031232074-4257be937185?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
        price:1200,
        location:"New York",
        country:"USA"
    });
    await samplelisting.save();
    resp.send("Listing created successfully!");
    //resp.send(samplelisting)
});
// const path = require("path");
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));


app.get("/{*splat}", asyncWrap(async (req, resp) => {
    throw new ExpressError(404, "This is a test error!");
}));
app.use((err, req, resp, next) => {
   //give some default value let { statusCode , message } = err;
       let { statusCode = 500, message = "Something went wrong!" } = err;

  resp.status(statusCode).render("error.ejs", {
        statusCode,
        message
    });
    //resp.status(statusCode).send(message);
});
//app.listen(8000,()=>{console.log("server is running on port 8000")})
app.listen(process.env.PORT || 8000, () => {
    console.log("server is running");
});