const mongoose = require("mongoose");


const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://manwarerutuj:Rituj*2703!@cluster0.vb2npig.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Add this option for the latest MongoDB driver
    });
    console.log("Connected to MongoDB");
}catch(error){
    console.error("Error connecting to MongoDB:", error);
}
};

module.exports = mongoDB;