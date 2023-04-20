import * as yup from "yup"

export const myMemorySchema = yup.object().shape({
  text: yup.string().required("Text is required"),
  languageFrom: yup.string().required("Target language is required"),
  languageTo: yup.string().required("Source language is required"),
})
