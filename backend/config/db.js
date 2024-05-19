const mongoose = require("mongoose");

const connnecDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Mongodb connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connnecDB;
