import axios from "axios";
import { BASE_URL } from "../../envVariables";

const uploadImg = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/upload`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/api/upload/delete-img/${id}`
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
