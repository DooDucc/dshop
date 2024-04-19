import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import brandReducer from "./brand/slice";
import productReducer from "./product/slice";
import userReducer from "./user/slice";
import categoryReducer from "./category/slice";
import feedbackReducer from "./feedback/slice";
import orderReducer from "./order/slice";
import uploadReducer from "./upload/slice";
import ratingReducer from "./rating/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    order: orderReducer,
    feedback: feedbackReducer,
    upload: uploadReducer,
    rating: ratingReducer,
  },
});
