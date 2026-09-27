const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const reviewModel=require("./reviews.js");
    const  listingSchema=new Schema({
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
    //     image:{
    //         type:String,
    //         default:
    // "https://images.unsplash.com/photo-1788031232074-4257be937185?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    //         //set is when someimage will be coming but khali but default used when no image itself
    //         set:(v)=>v===""? "https://images.unsplash.com/photo-1788031232074-4257be937185?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D":v,
    //     },
    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1788031232074-4257be937185?w=500&auto=format&fit=crop&q=60"
    }
},
        price:Number,
        location:String,
        country:String,
        reviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Review",
            }
        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",

        },
geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}

    })
    //if listing deleted even the    review posts related to it deleted!
    listingSchema.post("findOneAndDelete", async function (doc) {
        if (doc) {
            await reviewModel.deleteMany({  
                _id: { $in: doc.reviews }
            });
        }
    });
    const listingModel=mongoose.model("listing",listingSchema);
    module.exports=listingModel;
