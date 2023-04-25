import * as yup from "yup"

export const grammarSchema = yup.object().shape({
  text: yup.string().required("Text is required"),
  lang: yup.string().required("Language is Required"),
})
