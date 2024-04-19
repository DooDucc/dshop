import { toast } from "react-toastify"
import { createAsyncThunk } from "@reduxjs/toolkit"
import contactService from "./services"

export const postFeedback = createAsyncThunk(
  "contact/postFeedback",
  async (feedbackData, thunkAPI) => {
    try {
      await contactService.postFeedback(feedbackData)
      toast.success("Your feedback is sent")
    } catch (error) {
      toast.error("Something went wrong, please try again")
      return thunkAPI.rejectWithValue(error)
    }
  },
)
