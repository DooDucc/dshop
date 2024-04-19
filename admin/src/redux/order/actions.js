import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./services";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderByUser = createAsyncThunk(
  "order/getOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order, thunkAPI) => {
    try {
      return await orderService.updateOrder(order);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, thunkAPI) => {
    try {
      return await orderService.deleteOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthOrderIncome = createAsyncThunk(
  "order/getMonthOrderIncome",
  async (data, thunkAPI) => {
    try {
      return await orderService.getMonthOrderIncome(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearStatistics = createAsyncThunk(
  "order/getYearStatistics",
  async (data, thunkAPI) => {
    try {
      return await orderService.getYearStatistics(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
