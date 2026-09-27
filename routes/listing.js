// const express = require('express');
// const router = express.Router({mergeParams:true }); 
// const listingModel = require("../models/listing.js");
// const asyncWrap = require("../utils/wrapAsync.js");

//  const ExpressError = require("../utils/ExpressError.js");
// // const { listingSchema } = require("./schema.js");
// const { isLoggedIn,isOwner,validateListing }=require("../middleware.js");

// const listingcontroller=require("../controllers/listing.js");
// //index route
// router.get("/",asyncWrap(listingcontroller.index));

// // router.get("/",asyncWrap(async (req,resp)=>{
// //     let listings=await listingModel.find({});
// //         console.log("NUMBER OF LISTINGS:", listings.length);
// //         console.log(listings[0]);
// //         listings.forEach((listing) => {
// //         console.log(listing.title, listing.price);
// //     });
//         // resp.send("🔥 LISTINGS ROUTE IS WORKING 🔥");

// //    resp.render("listings/index.ejs",{listings:listings});
// // }));
// //create rout   
// router.post("/",isLoggedIn,validateListing,asyncWrap(async (req,resp,next)=>{
//    // let listing{name,description,image,price,location,country}=req.body;  

//    if(!req.body.listing){
//     throw new ExpressError(400,"send valid data forlisting");
//    }
//    try{  
//     let l=req.body;
//     console.log(l);
//     console.log(req.body.listing);
//     let data = req.body.listing;

//     data.image = {
//         filename: "listingimage",
//         url: data.image
//     };

//     const newlisting = new listingModel(data);
//     //const newlisting=new listingModel(l.listing);
//     //now save current username ie its new data
//    // console.log(req.user);
//     newlisting.owner=req.user._id;
//     await newlisting.save();
//     req.flash("success","new listing created!")
//     //resp.send("Data received!");
//     resp.redirect(`/listings`);
//    }catch(err){
//     next(err);
//    }

//  })); 


// // app.use((err,req,resp,next)=>{
// //     resp.status(500).send("Something went wrong!"+err.message);
// // });
// //new route above id ka!
// router.get("/new",isLoggedIn,asyncWrap(async (req,resp)=>{
//     resp.render("listings/new.ejs");
// })); 
// //show route
  
//     router.get("/:id", asyncWrap(async (req, resp) => {

//     console.log("LOOKING FOR ID:", req.params.id);

//     let listing = await listingModel
//         .findById(req.params.id)
//         .populate({
//             path:"reviews",
//         populate:{
//             path:   "author",
//         },
//     })
//         .populate("owner");

//     console.log("FOUND LISTING:", listing);

//     if (!listing) {
//       //  throw new ExpressError(404, "Listing not found");
//       req.flash("error","the one u searched for doesnt exist!");
//      return  resp.redirect("/listings");
//     }
// console.log(listing);
//     resp.render("listings/show.ejs", { listing });
// }));

//  router.get("/:id/edit",isLoggedIn,isOwner,asyncWrap(async (req,resp)=>{
//   let listing=await listingModel.findById(req.params.id);
//   resp.render("listings/edit.ejs",{listing:listing});   
//  }));
//  //update route
//  router.put("/:id",isLoggedIn,isOwner,asyncWrap(async (req, resp) => {
//      let id = req.params.id;
 
//      let data = req.body.listing;
 
//      // data.image = {
//      //     filename: "listingimage",
//      //     url: data.image
//      // };
 
//      await listingModel.findByIdAndUpdate(id, data);
 
//      resp.redirect(`/listings/${id}`);
//  }));
// router.delete("/:id",isLoggedIn,isOwner,asyncWrap(async (req,resp)=>{ 
//         let id=req.params.id;
//         await listingModel.findByIdAndDelete(id);
//         resp.redirect("/listings");
//     }));
//  module.exports = router;
      
const express = require("express");
const router = express.Router({ mergeParams: true });
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

const asyncWrap = require("../utils/wrapAsync.js");

// Middleware
const {
    isLoggedIn,
    isOwner,
    validateListing
} = require("../middleware.js");

// Controller
const listingcontroller = require("../controllers/listing.js");


// ==========================================
// INDEX ROUTE
// GET /listings
// ==========================================

router.get(
    "/",
    asyncWrap(listingcontroller.index)
);


// ==========================================
// CREATE ROUTE
// POST /listings
// ==========================================

 router.post(
   "/",
    isLoggedIn,
   // validateListing,
upload.single('listing[image]'),
asyncWrap(listingcontroller.create)
 );
// router.post("/",upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// })

// ==========================================
// NEW ROUTE
// GET /listings/new
// ==========================================

router.get(
    "/new",
    isLoggedIn,
    asyncWrap(listingcontroller.newForm)
);


// ==========================================
// SHOW ROUTE
// GET /listings/:id
// ==========================================

router.get(
    "/:id",
    asyncWrap(listingcontroller.show)
);


// ==========================================
// EDIT ROUTE
// GET /listings/:id/edit
// ==========================================

router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    asyncWrap(listingcontroller.editForm)
);


// ==========================================
// UPDATE ROUTE
// PUT /listings/:id
// ==========================================

router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    
    asyncWrap(listingcontroller.update)
);


// ==========================================
// DELETE ROUTE
// DELETE /listings/:id
// ==========================================

router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    asyncWrap(listingcontroller.destroy)
);


module.exports = router;    