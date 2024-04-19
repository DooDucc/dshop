import { axiosConfig } from "../../utils/axiosConfig"

const postFeedback = async (feedbackData: any) => {
  const response = await axiosConfig.post(`feedback`, feedbackData)
  return response.data
}

const contactService = {
  postFeedback,
}

export default contactService
