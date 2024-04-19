const asyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel");

const getRatings = asyncHandler(async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("postedby prodId")
      .populate("subRating.user");

    res.json(ratings);
  } catch (error) {
    throw new Error(error);
  }
});

const getRating = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findById(id)
      .populate("postedby prodId")
      .populate("subRating.user");

    res.json(rating);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRating = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const rating = await Rating.findByIdAndDelete(id);

    if (rating) {
      res.json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Can not find this rating" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSubRating = asyncHandler(async (req, res) => {
  try {
    const { id, subRatingId } = req.params;

    const rating = await Rating.findById(id);

    if (rating) {
      const updatedRating = await Rating.findByIdAndUpdate(
        { _id: rating._id },
        {
          $pull: {
            subRating: {
              _id: subRatingId,
            },
          },
        },
        {
          new: true,
        }
      );
      res.json(updatedRating);
    } else {
      res.status(404).json({ message: "Can not find this rating" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getRatings,
  getRating,
  deleteRating,
  deleteSubRating,
};
