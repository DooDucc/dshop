const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const alreadyExistCart = await Cart.findOne({ orderby: _id });
    if (alreadyExistCart) {
      const getPrice = await Product.findById(cart?.productId)
        .select("price")
        .exec();
      const updatedCart = await Cart.findByIdAndUpdate(
        { _id: alreadyExistCart._id },
        {
          $push: {
            products: {
              productDetails: cart?.productId,
              quantity: cart?.quantity,
              price: getPrice?.price,
            },
          },
          cartTotal:
            alreadyExistCart.cartTotal + cart?.quantity * getPrice?.price,
        },
        {
          new: true,
        }
      );
      res.json(updatedCart);
    } else {
      const getPrice = await Product.findById(cart?.productId)
        .select("price")
        .exec();

      const products = [
        {
          productDetails: cart?.productId,
          quantity: cart?.quantity,
          price: getPrice?.price,
        },
      ];

      const cartTotal = cart?.quantity * getPrice?.price;

      const newCart = await new Cart({
        products,
        cartTotal,
        orderby: _id,
      }).save();

      res.json(newCart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.productDetails"
    );
    if (cart) {
      res.json(cart);
    } else {
      res.json({ message: "Cart is empty" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantity = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, quantity } = req.body;
  validateMongoDbId(_id);
  try {
    const alreadyExistCart = await Cart.findOne({ orderby: _id });

    if (alreadyExistCart) {
      await Cart.updateOne(
        {
          _id: alreadyExistCart?._id,
          "products.productDetails": new mongoose.Types.ObjectId(productId),
        },
        { $set: { "products.$.quantity": quantity } }
      );

      const cartAfterUpdateQuantity = await Cart.findOne({ orderby: _id });

      const updateCartTotal = cartAfterUpdateQuantity.products?.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0
      );

      const updatedCart = await Cart.findByIdAndUpdate(
        { _id: alreadyExistCart._id },
        {
          cartTotal: updateCartTotal,
        },
        {
          new: true,
        }
      );

      res.json(updatedCart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, quantity, price } = req.body;
  validateMongoDbId(_id);
  try {
    const alreadyExistCart = await Cart.findOne({ orderby: _id });

    if (alreadyExistCart) {
      const updatedCart = await Cart.findByIdAndUpdate(
        { _id: alreadyExistCart._id },
        {
          $pull: {
            products: {
              productDetails: productId,
            },
          },
          cartTotal: alreadyExistCart.cartTotal - quantity * price,
        },
        {
          new: true,
        }
      );
      res.json(updatedCart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const clearCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOneAndDelete({ orderby: _id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCart,
  getUserCart,
  clearCart,
  deleteProductInCart,
  updateProductQuantity,
};
