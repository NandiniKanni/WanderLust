const Listing=require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.path,"..",req.originalUrl)
    if (!req.isAuthenticated()) {
        //redirect url too if user not logged in 
        req.session.redirectUrl=req.originalUrl;//better to use locals else might be changed on login oage no!
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error","You dont have permission to edit!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        let errmsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, error.details[0].message);
    }
else{
    next();}
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        let errmsg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, error.details[0].message);
    }
else{
    next();}
};
module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You arent the author of this review!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};