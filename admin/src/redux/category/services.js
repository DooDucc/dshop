import { axiosConfig } from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axiosConfig.get(`category`);
  return response.data;
};
const createCategory = async (category) => {
  const response = await axiosConfig.post(`category`, category);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axiosConfig.get(`category/${id}`);
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axiosConfig.delete(`category/${id}`);
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axiosConfig.put(`category/${category.id}`, {
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
