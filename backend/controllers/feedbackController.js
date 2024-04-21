const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const sendEmail = require("../utils/sendEmail");

const createFeedback = asyncHandler(async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.json(newFeedback);
  } catch (error) {
    throw new Error(error);
  }
});

const updateFeedbackStatus = asyncHandler(async (req, res) => {
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
    const feedback = await Feedback.findById(id);
    res.json(feedback);
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

const replyFeedback = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const { reply } = req.body;

    const feedback = await Feedback.findById(id);
    const user = await User.find({ email: feedback?.email });

    if (feedback) {
      await Feedback.findByIdAndUpdate(id, { reply }, { new: true });

      const data = {
        to: feedback?.email,
        text: `Hey ${user?.lastName} ${user?.firstName}`,
        subject: "Reply Feedback",
        html: reply,
      };
      sendEmail(data);

      res.json({ message: "success" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  replyFeedback,
};
