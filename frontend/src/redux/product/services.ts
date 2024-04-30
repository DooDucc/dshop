import { axiosConfig } from "../../utils/axiosConfig"

const getAllProducts = async () => {
  const response = await axiosConfig.get("/api/product")
  return response.data
}

const getProducts = async (data: any) => {
  const url = `/api/product?page=${data?.page ? data?.page : 1}&limit=${data?.limit ? data?.limit : 9}
  ${data?.filterBrand ? `&brand=${data?.filterBrand}` : ""}
  ${data?.filterCategory ? `&category=${data?.filterCategory}` : ""}
  ${data?.minPrice ? `&price[gte]=${data?.minPrice}` : ""}
  ${data?.maxPrice ? `&price[lte]=${data?.maxPrice}` : ""}
  ${data?.sort ? `&sort=${data?.sort}` : ""}`

  const response = await axiosConfig.get(url.replace(/\s/g, ""))
  return response.data
}

const getProduct = async (id: string) => {
  const response = await axiosConfig.get(`/api/product/${id}`)
  return response.data
}

const addToFavProducts = async (id: string) => {
  const response = await axiosConfig.put(`/api/product/favproducts`, {
    prodId: id,
  })
  return response.data
}

const rating = async (data: any) => {
  const response = await axiosConfig.post(`/api/product/rating`, data)
  return response.data
}

const getRatings = async (id: string) => {
  const response = await axiosConfig.get(`/api/product/ratings/${id}`)
  return response.data
}

const replyRating = async (data: any) => {
  const response = await axiosConfig.put(`/api/product/reply-rating`, data)
  return response.data
}

const getBrands = async () => {
  const response = await axiosConfig.get(`/api/brand`)
  return response.data
}

const getCategories = async () => {
  const response = await axiosConfig.get(`/api/category`)
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
  getAllProducts,
}

export default productService
