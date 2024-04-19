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

const updateFeedback = async (feedback) => {
  const response = await axiosConfig.put(`feedback/${feedback.id}`, {
    status: feedback.feedbackData,
  });
  return response.data;
};

const feedbackService = {
  getFeedbacks,
  deleteFeedback,
  getFeedback,
  updateFeedback,
};

export default feedbackService;
