import { axiosConfig } from "../../utils/axiosConfig";

const getOrders = async () => {
  const response = await axiosConfig.get(`order`);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axiosConfig.get(`order/${id}`);
  return response.data;
};

const updateOrder = async (order) => {
  const response = await axiosConfig.put(`order/${order.id}`, {
    status: order.orderData,
  });
  return response.data;
};

const deleteOrder = async (id) => {
  const response = await axiosConfig.delete(`order/${id}`);
  return response.data;
};

const getMonthOrderIncome = async (data) => {
  const response = await axiosConfig.get(
    `order/get-month-order-income/${data.year}`
  );
  return response.data;
};

const getYearStatistics = async (data) => {
  const response = await axiosConfig.get(
    `order/get-year-statistics/${data.year}`
  );
  return response.data;
};

const orderService = {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  getMonthOrderIncome,
  getYearStatistics,
};

export default orderService;
