import axios from "axios";
import { BASE_URL } from "../envVariables";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (axiosConfig) => {
    axiosConfig.paramsSerializer = (params) => paramsSerializer(params);
    const userStorage = localStorage.getItem("user");

    if (userStorage) {
      const user = JSON.parse(userStorage);
      if (user?.token) {
        axiosConfig.headers.Authorization = `Bearer ${user?.token}`;
      }
    }

    return axiosConfig;
  },
  async (error) => await Promise.reject(error)
);

export { axiosConfig };
