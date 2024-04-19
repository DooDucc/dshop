import axios, { type AxiosResponse, AxiosError } from "axios"
import { BASE_URL } from "../envVariables"
import { toast } from "react-toastify"

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosConfig.interceptors.request.use(
  axiosConfig => {
    // @ts-expect-errors
    axiosConfig.paramsSerializer = (params: any) => paramsSerializer(params)
    const userStorage = localStorage.getItem("user")

    if (userStorage) {
      const user = JSON.parse(userStorage)
      if (user?.token) {
        axiosConfig.headers.Authorization = `Bearer ${user?.token}`
      }
    }

    return axiosConfig
  },
  async error => await Promise.reject(error),
)

const handleError = (error: AxiosError) => {
  const resError: AxiosResponse | undefined = error.response

  if (
    resError?.data?.message ==
    "TypeError: Cannot destructure property '_id' of 'req.user' as it is null."
  ) {
    toast.error(
      "Your account is deleted, please contact to admin or register again!!!",
    )
    setTimeout(() => {
      localStorage.clear()
      window.location.href = "/login"
    }, 3000)
  }

  return Promise.reject(error)
}

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => handleError(error),
)

export { axiosConfig }
