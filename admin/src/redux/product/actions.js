import { createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./services";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      await productService.createProduct(productData.body);
      toast.success("Added Successfullly!");
      productData.navigate("/products");
    } catch (error) {
      toast.success("Fail to add new product");
      productData.navigate("/products");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, thunkAPI) => {
    try {
      await productService.updateProduct(product.body);
      toast.success("Updated Successfullly!");
      product.navigate("/products");
    } catch (error) {
      toast.success("Fail to update product!");
      product.navigate("/products");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
