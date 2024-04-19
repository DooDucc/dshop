const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const validateMongoDbId = require("../utils/validateMongodbId");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const { createVNPayPayment } = require("./vnpay");

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { shippingInfo, products, paymentMethod } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    const userCart = await Cart.findOne({ orderby: _id });

    await new Order({
      products: userCart.products,
      paymentIntent: {
        ...shippingInfo,
        paymentMethod,
      },
      orderby: _id,
      totalPrice: userCart.cartTotal,
      totalSoldProducts: products?.reduce(
        (acc, curr) => acc + curr?.quantity,
        0
      ),
      month: new Date().getMonth() + 1,
    }).save();

    const update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.productDetails },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    });

    await Product.bulkWrite(update, {});
    await Cart.findOneAndDelete({ orderby: _id });

    if (paymentMethod === "paypal") {
      const lineItems = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productDetails.title,
            images: [product.productDetails.images[0].url],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/?checkout=true",
        cancel_url: "http://localhost:5173/",
      });

      res.json({ id: session.id });
    } else {
      const vnpUrl = createVNPayPayment(userCart);
      res.json({ paymentUrl: vnpUrl });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);

    const userOrders = await Order.find({ orderby: _id })
      .populate("products.productDetails")
      .populate("orderby");
    res.json(userOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productDetails")
      .populate("orderby")
      .exec();
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const order = await Order.findById(id)
      .populate("products.productDetails")
      .populate("orderby")
      .exec();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);

    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deletedOrder = await Order.findByIdAndDelete(id);
    res.json(deletedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

const getMonthOrderRevenue = asyncHandler(async (req, res) => {
  try {
    const { year } = req.params;

    const firstDayOfYear = new Date(year, 0, 1, 0, 0, 0);
    const lastDayOfYear = new Date(year, 11, 31, 0, 0, 0);

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: lastDayOfYear,
            $gte: firstDayOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
          },
          revenue: {
            $sum: "$totalPrice",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    throw new Error(error);
  }
});

const getYearStatistics = asyncHandler(async (req, res) => {
  try {
    const { year } = req.params;

    const firstDayOfYear = new Date(year, 0, 1, 0, 0, 0);
    const lastDayOfYear = new Date(year, 11, 31, 0, 0, 0);

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $lte: lastDayOfYear,
            $gte: firstDayOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          orders: {
            $sum: 1,
          },
          revenue: {
            $sum: "$totalPrice",
          },
          soldProducts: {
            $sum: "$totalSoldProducts",
          },
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrder,
  getMonthOrderRevenue,
  getYearStatistics,
};
