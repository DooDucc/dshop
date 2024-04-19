import { axiosConfig } from "../../utils/axiosConfig"

const createOrder = async (orderData: any) => {
  const response = await axiosConfig.post(`order`, orderData)
  return response.data
}

const getOrders = async () => {
  const response = await axiosConfig.get(`order/get-orders`)
  return response.data
}

const vnpayCheckout = async (orderData: any) => {
  const response = await axiosConfig.post(`order/vnpay-checkout`, orderData)
  return response.data
}

const orderService = {
  createOrder,
  getOrders,
  vnpayCheckout,
}

export default orderService
