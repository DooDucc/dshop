import { axiosConfig } from "../../utils/axiosConfig";

const login = async (user) => {
  const response = await axiosConfig.post(`/api/user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const blockUser = async (id) => {
  const response = await axiosConfig.put(`/api/user/block-user/${id}`);
  return response.data;
};

const unblockUser = async (id) => {
  const response = await axiosConfig.put(`/api/user/unblock-user/${id}`);
  return response.data;
};

const authService = {
  login,
  blockUser,
  unblockUser,
};

export default authService;
