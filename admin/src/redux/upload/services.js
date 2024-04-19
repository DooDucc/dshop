import { axiosConfig } from "../../utils/axiosConfig";
import axios from "axios";
import { BASE_URL } from "../../envVariables";

const uploadImg = async (data) => {
  const response = await axios.post(`${BASE_URL}upload`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axiosConfig.delete(
    `${BASE_URL}upload/delete-img/${id}`
  );
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
