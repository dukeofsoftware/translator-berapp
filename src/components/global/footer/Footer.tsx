"use client"

import Link from "next/link"
import {
  ActionIcon,
  Container,
  Group,
  Text,
  createStyles,
  rem,
} from "@mantine/core"
import { AiFillGithub,  } from "react-icons/ai"
import { BsDiscord } from "react-icons/bs"

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    bottom: 0,
    position: "relative",
    width: "100%",
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

const footerData = [
  {
    title: "Social",
    links: [
      {
        label: "Github",
        link: "https://github.com/dukeofsoftware/translator-berapp",
      },
  
      {
        label: "Instagram",
        link: "https://www.instagram.com/artikyorgunhissediyor/",
      },
      { label: "Discord", link: "https://discord.gg/rCMutnJW9y" },
    ],
  },
]
export function Footer() {
  const { classes } = useStyles()

  const groups = footerData.map((group) => {
    const links = group.links.map((link, index) => (
      <Link
        key={index}
        className={classes.link}
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    ))

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <div className="text-lg font-extrabold dark:text-neutral-100 text-neutral-800">
            <Link href={"/"}>Translator</Link>
          </div>
          <Text size="xs" color="dimmed" className={classes.description}>
            Translator is a free, open-source, and community-driven translation
            platform.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group spacing={0} className={classes.social} position="right" noWrap>
         
          <a href="https://github.com/dukeofsoftware/translator-berapp">
            <ActionIcon size="lg">
              <AiFillGithub size="1.05rem" />
            </ActionIcon>
          </a>
          <a href="https://discord.gg/rCMutnJW9y">
            <ActionIcon size="lg">
              <BsDiscord size="1.05rem" />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </footer>
  )
}
