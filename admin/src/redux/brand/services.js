import { axiosConfig } from "../../utils/axiosConfig";

const getBrands = async () => {
  const response = await axiosConfig.get(`brand`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axiosConfig.post(`brand`, brand);

  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axiosConfig.put(
    `brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );

  return response.data;
};

const getBrand = async (id) => {
  const response = await axiosConfig.get(`brand/${id}`);

  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axiosConfig.delete(`brand/${id}`);

  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
