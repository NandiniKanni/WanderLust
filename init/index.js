const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const dataWithOwner =initData.data.map((obj)=>({...obj, owner:"6a9f128d1e1840d84086c12d",}))
  //the abover works only for the existing data! not for the new ones being created! now new ones need 
  await Listing.insertMany(dataWithOwner );
  console.log("data was initialized");
};

initDB(); 