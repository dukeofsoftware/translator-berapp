import * as yup from "yup"

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),
})
export const userRegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters."),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),
  passwordConfirmation: yup

    .string()
    .required("Password confirmation is required."),
})

export const userPasswordResetSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),
  newPassword: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters."),

  newPasswordConfirmation: yup

    .string()
    .required("Password confirmation is required."),
})
