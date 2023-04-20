import * as yup from "yup"

export const promptSchema = yup.object().shape({
  prompt: yup.string().required("Prompt is required"),
  language: yup.string().required("Language is required"),
})
