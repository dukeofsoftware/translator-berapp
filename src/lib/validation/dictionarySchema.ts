import * as yup from "yup"

export const dictionarySchema = yup.object().shape({
    word: yup.string().required("Word is required"),
})
