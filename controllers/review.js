const Review = require("../models/reviews.js");
const listingModel = require("../models/listing.js");


// CREATE REVIEW
module.exports.createReview = async (req, resp) => {

    console.log("1. Route started");

    // Find the listing
    let listing = await listingModel.findById(req.params.id);
    console.log("2. Listing found");

    // Get review data from form
    let review = req.body.review;
    console.log("3. Review received:", review);

    // Create new review
    let newReview = new Review(review);
    console.log("4. New review created:", newReview);

    // Store logged-in user's ID as review author
    newReview.author = req.user._id;
    console.log(newReview);

    // Add review to listing
    listing.reviews.push(newReview);
    console.log("6. Review pushed!");

    // Save review
    await newReview.save();
    console.log("5. Review saved!");

    // Save updated listing
    await listing.save();
    console.log("7. Listing saved!");

    // Go back to listing page
    resp.redirect(`/listings/${listing._id}`);
};


// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {

    let { id, reviewId } = req.params;

    // Remove review ID from listing
    await listingModel.findByIdAndUpdate(
        id,
        { $pull: { reviews: reviewId } }
    );

    // Delete review document
    await Review.findByIdAndDelete(reviewId);

    // Go back to listing page
    res.redirect(`/listings/${id}`);
};


// DELETE LISTING
module.exports.deleteListing = async (req, resp) => {

    let id = req.params.id;

    await listingModel.findByIdAndDelete(id);

    resp.redirect("/listings");
};