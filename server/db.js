const mongoose = require("mongoose");
require('dotenv').config();


const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for the latest MongoDB driver
    });
    console.log("Connected to MongoDB");
}catch(error){
    console.error("Error connecting to MongoDB:", error);
}
};

module.exports = mongoDB;