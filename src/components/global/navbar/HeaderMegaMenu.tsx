"use client"

import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,

  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Container,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { TbBrandOpenai } from "react-icons/tb"
import Link from "next/link"
import UserMenu from "./UserMenu"
import { ThemeToggle } from "./theme-toggle"
import { Session } from "next-auth"
import { AiOutlineDown, AiFillBook, AiOutlineCheckCircle } from "react-icons/ai"
import { RiMoneyPoundCircleLine } from "react-icons/ri"
import { HiTranslate } from "react-icons/hi"
import { MdOutlineQuiz } from "react-icons/md"
import HeaderLink from "./HeaderLink"
const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    defaultRadius: theme.radius.md,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}))
const mockdata = [
  {
    icon: AiOutlineCheckCircle,
    title: "Grammar Check",
    description: "Check your grammar and spelling",
  },
  {
    icon: TbBrandOpenai,
    title: "AI Tools",
    description:
      "Artifical Intelligence grammar checker, translation, and more",
  },
  {
    icon: AiFillBook,
    title: "Dictionary",
    description: "Search for words and definitions",
  },
  {
    icon: MdOutlineQuiz,
    title: "Quiz ",
    description: "Test your knowledge with our quizzes",
  },
  {
    icon: HiTranslate,
    title: "Translate",
    description: "Translate text into languages",
  },
  {
    icon: RiMoneyPoundCircleLine,
    title: "Free for everyone",
    description:
      "Free for everyone to use and learn from our tools and resources",
  },
]
export function HeaderMegaMenu({ session }: { session: Session | null }) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const { classes, theme } = useStyles()

  const links = mockdata.map((item) => (
    <HeaderLink
      icon={item.icon}
      title={item.title}
      description={item.description}
    />
  ))

  return (
    <Container>
      <Box pb={120}>
        <Header height={70} px="md">
          <Group position="apart" sx={{ height: "100%" }}>
            <div className="text-lg font-extrabold dark:text-neutral-100 text-neutral-800">
              Translator
            </div>
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <Link href="/" className={classes.link}>
                Home
              </Link>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <Link href="/berapp/features" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <AiOutlineDown
                        size={16}
                        color={theme.fn.primaryColor()}
                      />
                    </Center>
                  </Link>
                </HoverCard.Target>
                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text fw={500}>Features</Text>
                    <Link href="/berapp/features" className="font-light">
                      View all
                    </Link>
                  </Group>
                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                  />
                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
                  <div className={classes.dropdownFooter}>
                    <Group position="apart">
                      <div>
                        <Text fw={500} fz="sm">
                          Get started
                        </Text>
                        <Text size="xs" color="dimmed">
                          Try paid version
                        </Text>
                      </div>
                      <Button variant="default">Pricing</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <Link href="/about" className={classes.link}>
                About
              </Link>
            </Group>
            <Group className={classes.hiddenMobile}>
              <div className="flex items-center gap-2">
                {session ? (
                  <UserMenu session={session} />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth/login">
                      <Button variant="outline" color="gray">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button variant="light">Sign Up</Button>
                    </Link>
                  </div>
                )}
                <ThemeToggle />
              </div>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <AiOutlineDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <Link href="/about" className={classes.link}>
              About
            </Link>

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />
            <Group position="center" grow pb="xl" px="md">
              <Link href={"/auth/login"}>
                <Button variant="default">Log in</Button>
              </Link>
              <Link href={"/auth/register"}>
                <Button>Sign up</Button>
              </Link>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    </Container>
  )
}
