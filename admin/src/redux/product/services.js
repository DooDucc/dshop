import { axiosConfig } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosConfig.get(`product`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axiosConfig.post(`product`, product);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axiosConfig.get(`product/${id}`);
  return response.data;
};

const updateProduct = async (product) => {
  const { id, ...body } = product;
  const response = await axiosConfig.put(`product/${id}`, body);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axiosConfig.delete(`product/${id}`);
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
