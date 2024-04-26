import { axiosConfig } from "../../utils/axiosConfig";

const getRatings = async () => {
  const response = await axiosConfig.get(`/api/rating`);
  return response.data;
};

const getRating = async (id) => {
  const response = await axiosConfig.get(`/api/rating/${id}`);
  return response.data;
};

const deleteRating = async (id) => {
  const response = await axiosConfig.delete(`/api/rating/delete-rating/${id}`);
  return response.data;
};

const deleteSubRating = async (data) => {
  const response = await axiosConfig.delete(
    `/api/rating/delete-subrating/${data.id}/${data.subRatingId}`
  );
  return response.data;
};

const replyRating = async (data) => {
  const response = await axiosConfig.put(`/api/product/reply-rating`, data);
  return response.data;
};

const ratingService = {
  getRatings,
  deleteRating,
  deleteSubRating,
  getRating,
  replyRating,
};

export default ratingService;
