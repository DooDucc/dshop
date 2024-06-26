const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected");
  } catch (error) {
    console.log("Error");
  }
};
module.exports = dbConnect;
