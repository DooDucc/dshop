const mongoose = require("mongoose");

var ratingSchema = new mongoose.Schema(
  {
    star: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    postedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    subRating: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
