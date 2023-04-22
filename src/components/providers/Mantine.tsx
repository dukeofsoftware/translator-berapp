"use client"

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"

interface MantineProps {
  children: React.ReactNode
}

const Mantine: React.FC<MantineProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  useHotkeys([["mod+J", () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className={colorScheme === "dark" ? "dark" : "light"}>
          {children}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default Mantine
