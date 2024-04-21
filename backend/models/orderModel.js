const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
        price: Number,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Cancelled", "Delivered"],
    },
    month: {
      type: String,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalSoldProducts: {
      type: Number,
      default: 0,
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
