import { axiosConfig } from "../../utils/axiosConfig"

const getCart = async () => {
  const response = await axiosConfig.get(`cart`)
  return response.data
}

const addToCart = async (cartData: any) => {
  const response = await axiosConfig.post(`cart`, cartData)
  return response.data
}

const deleteProductInCart = async (cartData: any) => {
  const response = await axiosConfig.post(`cart/delete-product`, cartData)
  return response.data
}

const updateProductQuantity = async (cartData: any) => {
  const response = await axiosConfig.post(
    `cart/update-product-quantity`,
    cartData,
  )
  return response.data
}

const clearCart = async () => {
  const response = await axiosConfig.delete(`cart/clear-cart`)
  return response.data
}

const cartService = {
  addToCart,
  getCart,
  deleteProductInCart,
  clearCart,
  updateProductQuantity,
}

export default cartService
