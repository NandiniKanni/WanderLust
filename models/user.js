const mongoose=require("mongoose");
const Schema=mongoose.Schema
const passportLocalMongoose=require("passport-local-mongoose").default;
//hey actually username and password plm does hash and salt them by itself therefore no need to mention them again
const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
})
// plugin goes on the SCHEMA
userSchema.plugin(passportLocalMongoose);

// create model
const User = mongoose.model("User", userSchema);

module.exports = User;