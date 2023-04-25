"use client"

import { ColorScheme } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { ToastContainer } from "react-toastify"

const ToastProvider = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={colorScheme === "dark" ? "dark" : "light"}
    />
  )
}

export default ToastProvider
