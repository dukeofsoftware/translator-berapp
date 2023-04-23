"use client"

import { Accordion, Container, Title, createStyles, rem } from "@mantine/core"

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

const askedQuestions = [
  {
    title: "How can I reset my password?",
    description:
      "After logging in, you can change your password from the settings section in the top right menu.",
  },
  {
    title: "Which languages does the dictionary support?",
    description:
      "The dictionary currently only supports English words. We're working on adding more languages in the future.",
  },
  {
    title: "Is using the application free of charge?",
    description:
      "Using the application is free of charge, but if you want to upgrade your plan, you can check the pricing page.",
  },
  {
    title: "How can I contact you?",
    description: "You can contact us via Instagram, GitHub, LinkedIn, or email",
  },
  {
    title: "How can I translate a word?",
    description:
      "You can translate a word by typing it in the search bar and clicking the translate button.",
  },
  {
    title: "Which technologies did you use while developing the application?",
    description:
      "We used Next.js, React, TypeScript, Mantine, and Tailwind CSS. For more information, you can check the GitHub repository.",
  },
]

export default function AskedQuestions() {
  const { classes } = useStyles()
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Frequently Asked Questions
      </Title>
      <Accordion variant="separated">
        {askedQuestions.map((question) => (
          <Accordion.Item className={classes.item} value="reset-password">
            <Accordion.Control>{question.title}</Accordion.Control>
            <Accordion.Panel>{question.description}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}
