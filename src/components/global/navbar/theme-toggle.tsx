"use client"

import * as React from "react"
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core"
import { BsMoonStars, BsSun } from "react-icons/bs"

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? (
          <BsSun size={"1.2rem"} />
        ) : (
          <BsMoonStars size={"1.2rem"} />
        )}
      </ActionIcon>
    </Group>
  )
}
