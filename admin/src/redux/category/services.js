import { axiosConfig } from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axiosConfig.get(`/api/category`);
  return response.data;
};
const createCategory = async (category) => {
  const response = await axiosConfig.post(`/api/category`, category);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axiosConfig.get(`/api/category/${id}`);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axiosConfig.delete(`/api/category/${id}`);
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axiosConfig.put(`/api/category/${category.id}`, {
    title: category.pCatData.title,
  });
  return response.data;
};

const pCategoryService = {
  getCategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default pCategoryService;
