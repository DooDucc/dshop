import { axiosConfig } from "../../utils/axiosConfig"

const login = async (user: any) => {
  const response = await axiosConfig.post(`/api/user/login`, user)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const register = async (user: any) => {
  const response = await axiosConfig.post(`/api/user/register`, user)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const forgotPasswordToken = async (email: string) => {
  const response = await axiosConfig.post(`/api/user/forgot-password-token`, {
    email,
  })

  return response.data
}

const resetPassword = async (data: any) => {
  const response = await axiosConfig.put(
    `/api/user/reset-password/${data.token}`,
    {
      password: data.password,
    },
  )

  return response.data
}

const updateProfile = async (user: any) => {
  const response = await axiosConfig.put(`/api/user/edit-user`, user)
  if (response.data) {
    const oldProfile = JSON.parse(localStorage.getItem("user") || "")
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...oldProfile,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
      }),
    )
  }
  return response.data
}

const getFavProducts = async () => {
  const response = await axiosConfig.get(`/api/user/favProducts`)

  return response.data
}

const authService = {
  login,
  register,
  getFavProducts,
  updateProfile,
  forgotPasswordToken,
  resetPassword,
}

export default authService
