const Product = require("../models/productModel");
const User = require("../models/userModel");
const Rating = require("../models/ratingModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});

const addToFavProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.favProducts.find(
      (id) => id.toString() === prodId
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { favProducts: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { favProducts: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// const rating = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { star, prodId, comment } = req.body;
//   try {
//     const user = await User.findById(_id);
//     const product = await Product.findById(prodId);
//     const alreadyRated = product.ratings.find(
//       (userId) => userId.postedby.toString() === _id.toString()
//     );
//     if (alreadyRated) {
//       await Product.updateOne(
//         {
//           ratings: { $elemMatch: alreadyRated },
//         },
//         {
//           $set: { "ratings.$.star": star, "ratings.$.comment": comment },
//         },
//         {
//           new: true,
//         }
//       );
//     } else {
//       await Product.findByIdAndUpdate(
//         prodId,
//         {
//           $push: {
//             ratings: {
//               star: star,
//               comment: comment,
//               postedby: `${user.firstName} ${user.lastName}`,
//             },
//           },
//         },
//         {
//           new: true,
//         }
//       );
//     }
//     const getAllRatings = await Product.findById(prodId);

//     const totalRating = getAllRatings.ratings.length;
//     const ratingSum = getAllRatings.ratings
//       .map((item) => item.star)
//       .reduce((prev, curr) => prev + curr, 0);
//     const actualRating = Math.round(ratingSum / totalRating);

//     const finalProduct = await Product.findByIdAndUpdate(
//       prodId,
//       {
//         totalRating: actualRating,
//       },
//       { new: true }
//     );

//     res.json(finalProduct);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const rating = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;

    await Rating.create({
      postedby: _id,
      prodId,
      star,
      comment,
    });

    res.json({ message: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});

const replyRating = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const { id, comment } = req.body;

    await Rating.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          subRating: {
            user: _id,
            comment,
          },
        },
      },
      {
        new: true,
      }
    );

    res.json({ message: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getRatings = asyncHandler(async (req, res) => {
  try {
    const { prodId } = req.params;

    const ratings = await Rating.find({ prodId })
      .populate("postedby prodId")
      .populate("subRating.user");

    if (ratings) {
      const totalRating = ratings.length;
      const ratingSum = ratings
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      const actualRating = Math.round(ratingSum / totalRating);

      res.json({
        data: ratings,
        totalRating: actualRating || 0,
      });
    } else {
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToFavProducts,
  rating,
  getRatings,
  replyRating,
};