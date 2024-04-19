const Feedback = require("../models/feedbackModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createFeedback = asyncHandler(async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.json(newFeedback);
  } catch (error) {
    throw new Error(error);
  }
});

const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedFeedback);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    res.json(deletedFeedback);
  } catch (error) {
    throw new Error(error);
  }
});
const getFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getFeedback = await Feedback.findById(id);
    res.json(getFeedback);
  } catch (error) {
    throw new Error(error);
  }
});
const getFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
};
