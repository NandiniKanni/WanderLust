// const listingModel = require("../models/listing.js");

// module.exports.index=async(req,resp)=>{
//      let listings=await listingModel.find({});
//        resp.render("listings/index.ejs",{listings:listings});
// }
const listingModel = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const geocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken=process.env.MAP_TOKEN;
const geocodingClient =  geocoding({ accessToken:maptoken});

// ==========================================
// INDEX ROUTE
// Show all listings
// ==========================================

// module.exports.index = async (req, resp) => {

//     // Get all listings from MongoDB
//     let listings = await listingModel.find({});

//     // Send listings to index.ejs
//     resp.render("listings/index.ejs", { listings: listings });
// };

module.exports.index = async (req, resp) => {
    let listings = await listingModel.find({});

    console.log("LISTINGS FROM DB:");
    console.log(listings.map(listing => listing.title));

    resp.render("listings/index.ejs", { listings: listings });
};
// ==========================================
// CREATE ROUTE
// Create a new listing
// ==========================================

module.exports.create = async (req, resp, next) => {
    try {
        if (!req.body.listing) {
            throw new ExpressError(400, "Send valid data for listing");
        }

        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 2
        }).send();

        let data = req.body.listing;

        // Image handling
        if (req.file) {
            // User uploaded an image
            data.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        } 
        else if (data.imageUrl) {
            // User pasted an image URL
            data.image = {
                url: data.imageUrl,
                filename: "listingimage"
            };
        }

        const newlisting = new listingModel(data);

        newlisting.owner = req.user._id;

        newlisting.geometry = response.body.features[0].geometry;

        let savedlisting = await newlisting.save();

        console.log(savedlisting);

        req.flash("success", "New listing created!");

        resp.redirect("/listings");

    } catch (err) {
        next(err);
    }
};
// ==========================================
// NEW ROUTE
// Show form for creating a new listing
// ==========================================

module.exports.newForm = async (req, resp) => {

    // Render the new listing form
    resp.render("listings/new.ejs");
};


// ==========================================
// SHOW ROUTE
// Show one particular listing
// ==========================================

module.exports.show = async (req, resp) => {

    console.log("LOOKING FOR ID:", req.params.id);

    // Find listing using the ID from URL
    // Also populate reviews and their authors
    // Also populate the listing owner
    let listing = await listingModel
        .findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    console.log("FOUND LISTING:", listing);

    // If listing doesn't exist
    if (!listing) {

        req.flash(
            "error",
            "The one you searched for doesn't exist!"
        );

        return resp.redirect("/listings");
    }

    console.log(listing);

    // Send listing to show.ejs
    resp.render("listings/show.ejs", { listing });
};


// ==========================================
// EDIT FORM ROUTE
// Show edit form for a listing
// ==========================================

module.exports.editForm = async (req, resp) => {

    // Find listing using ID
    let listing = await listingModel.findById(req.params.id);

    // Send listing to edit.ejs
    resp.render("listings/edit.ejs", { listing: listing });
};


// ==========================================
// UPDATE ROUTE
// Update an existing listing
// ==========================================

module.exports.update = async (req, resp) => {

    let id = req.params.id;
    let data = req.body.listing;

    const listing = await listingModel.findById(id);

    // Update normal listing details
    listing.title = data.title;
    listing.description = data.description;
    listing.price = data.price;
    listing.location = data.location;
    listing.country = data.country;

    // If user uploads a new image
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // If user enters a new image URL
    else if (data.imageUrl) {
        listing.image = {
            url: data.imageUrl,
            filename: "listingimage"
        };
    }

    await listing.save();

    resp.redirect(`/listings/${id}`);
};
// ==========================================
// DELETE ROUTE
// Delete a listing
// ==========================================

module.exports.destroy = async (req, resp) => {

    // Get listing ID from URL
    let id = req.params.id;

    // Delete listing from MongoDB
    await listingModel.findByIdAndDelete(id);

    // Go back to all listings
    resp.redirect("/listings");
};