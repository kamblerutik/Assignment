const mongoose = require("mongoose");

const URI = process.env.URL;

const Connect = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Connect;
