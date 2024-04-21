const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  status: {
    type: String,
    default: "In Progress",
    enum: ["In Progress", "Replied"],
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
