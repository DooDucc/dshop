import { axiosConfig } from "../../utils/axiosConfig"

const getProducts = async (data: any) => {
  const url = `product?${data?.filterBrand ? `brand=${data?.filterBrand}` : ""}
  ${data?.filterCategory ? `&category=${data?.filterCategory}` : ""}
  ${data?.minPrice ? `&price[gte]=${data?.minPrice}` : ""}
  ${data?.maxPrice ? `&price[lte]=${data?.maxPrice}` : ""}
  ${data?.sort ? `&sort=${data?.sort}` : ""}`

  const response = await axiosConfig.get(url.replace(/\s/g, ""))
  return response.data
}

const getProduct = async (id: string) => {
  const response = await axiosConfig.get(`product/${id}`)
  return response.data
}

const addToFavProducts = async (id: string) => {
  const response = await axiosConfig.put(`product/favproducts`, {
    prodId: id,
  })
  return response.data
}

const rating = async (data: any) => {
  const response = await axiosConfig.post(`product/rating`, data)
  return response.data
}

const getRatings = async (id: string) => {
  const response = await axiosConfig.get(`product/ratings/${id}`)
  return response.data
}

const replyRating = async (data: any) => {
  const response = await axiosConfig.put(`product/reply-rating`, data)
  return response.data
}

const getBrands = async () => {
  const response = await axiosConfig.get(`brand`)
  return response.data
}

const getCategories = async () => {
  const response = await axiosConfig.get(`category`)
  return response.data
}

const productService = {
  getProducts,
  getProduct,
  addToFavProducts,
  rating,
  getBrands,
  getCategories,
  getRatings,
  replyRating,
}

export default productService
