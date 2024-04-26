import { axiosConfig } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosConfig.get(`/api/product`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axiosConfig.post(`/api/product`, product);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axiosConfig.get(`/api/product/${id}`);
  return response.data;
};

const updateProduct = async (product) => {
  const { id, ...body } = product;
  const response = await axiosConfig.put(`/api/product/${id}`, body);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosConfig.delete(`/api/product/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
