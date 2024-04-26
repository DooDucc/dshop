import { axiosConfig } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axiosConfig.get(`/api/user/all-users`);
  return response.data;
};

const getUser = async (id) => {
  const response = await axiosConfig.get(`/api/user/${id}`);
  return response.data;
};

const updateUser = async (user) => {
  const response = await axiosConfig.put(`/api/user/edit-user`, user.userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axiosConfig.delete(`/api/user/${id}`);
  return response.data;
};

const userService = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
