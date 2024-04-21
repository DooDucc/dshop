import { axiosConfig } from "../../utils/axiosConfig";

const getFeedbacks = async () => {
  const response = await axiosConfig.get(`feedback`);

  return response.data;
};

const deleteFeedback = async (id) => {
  const response = await axiosConfig.delete(`feedback/${id}`);
  return response.data;
};

const getFeedback = async (id) => {
  const response = await axiosConfig.get(`feedback/${id}`);
  return response.data;
};

const updateFeedbackStatus = async (feedback) => {
  const response = await axiosConfig.put(`feedback/status/${feedback.id}`, {
    status: feedback.status,
  });
  return response.data;
};

const replyFeedback = async (feedback) => {
  const response = await axiosConfig.put(`feedback/reply/${feedback.id}`, {
    reply: feedback.reply,
  });
  return response.data;
};

const feedbackService = {
  getFeedbacks,
  deleteFeedback,
  getFeedback,
  updateFeedbackStatus,
  replyFeedback,
};

export default feedbackService;
