import { createAsyncThunk } from "@reduxjs/toolkit"
import orderService from "./services"

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { dispatch }) => {
    try {
      // @ts-ignore
      const res = await orderService.createOrder(orderData.body)
      // @ts-ignore
      if (orderData.body.paymentMethod === "paypal") {
        // @ts-ignore
        orderData.stripe.redirectToCheckout({
          sessionId: res?.id,
        })
      } else {
        window.location.replace(res?.paymentUrl)
      }
    } catch (error) {}
  },
)

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { dispatch }) => {
    try {
      const res = await orderService.getOrders()
      return res
    } catch (error) {}
  },
)
