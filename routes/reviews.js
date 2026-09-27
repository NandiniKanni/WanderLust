// const express = require('express');
// const router = express.Router({mergeParams:true }); 
// const Review = require("../models/reviews.js");
// const listingModel = require("../models/listing.js");
// const asyncWrap = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// // const { listingSchema } = require("../schema.js");
// const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");




// router.post("/",isLoggedIn, validateReview, asyncWrap(async (req, resp) => {

//     console.log("1. Route started");

//     let listing = await listingModel.findById(req.params.id);
//     console.log("2. Listing found");

//     let review = req.body.review;
//     console.log("3. Review received:", review);
    

//     let newReview = new Review(review);
//     console.log("4. New review created:", newReview);

//     newReview.author=req.user._id;
//     console.log(newReview);

//     listing.reviews.push(newReview);
//     console.log("6. Review pushed!");
//      await newReview.save();
//     console.log("5. Review saved!");

//     await listing.save();
//     console.log("7. Listing saved!");

//     resp.redirect(`/listings/${listing._id}`);
// }));
// //delete review route
// router.delete("/:reviewId", isLoggedIn,isReviewAuthor,async (req, res) => {
// let { id, reviewId } = req.params;
// await listingModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
// await Review.findByIdAndDelete(reviewId);
// res.redirect(`/listings/${id}`);
// });
//  //delete route
//     router.delete("/listings/:id",isLoggedIn,asyncWrap(async (req,resp)=>{ 
//         let id=req.params.id;
//         await listingModel.findByIdAndDelete(id);
//         resp.redirect("/listings");
//     }));


// module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });

const asyncWrap = require("../utils/wrapAsync.js");

const {
    validateReview,
    isLoggedIn,
    isReviewAuthor
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


// CREATE REVIEW
router.route("/")
    .post(
        isLoggedIn,
        validateReview,
        asyncWrap(reviewController.createReview)
    );


// DELETE REVIEW
router.route("/:reviewId")
    .delete(
        isLoggedIn,
        isReviewAuthor,
        asyncWrap(reviewController.deleteReview)
    );


// DELETE LISTING
router.route("/listings/:id")
    .delete(
        isLoggedIn,
        asyncWrap(reviewController.deleteListing)
    );


module.exports = router;

