"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { features } from "@/constants"
import {
  Box,
  Burger,
  Button,
  Center,
  CloseButton,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Session } from "next-auth"
import { AiOutlineDown } from "react-icons/ai"

import { ThemeToggle } from "./theme-toggle"

const HeaderLink = dynamic(() => import("./HeaderLink"))
const UserMenu = dynamic(() => import("./UserMenu"))

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
          : theme.colors.gray[1],
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
    backgroundColor: "transparent",
    /*     backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0], */
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
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

export function HeaderMegaMenu({ session }: { session: Session | null }) {
  const pathname = usePathname()

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const { classes, theme } = useStyles()
  useEffect(() => {
    closeDrawer()
  }, [pathname, closeDrawer])
  const links = features.map((item) => (
    <HeaderLink
      href={item.hrefSession}
      icon={item.icon}
      title={item.title}
      description={item.description}
    />
  ))

  return (
    <>
      <Container className={`top-0 w-full z-40 sticky  `}>
        <Header height={70} px="md" className="">
          <Group position="apart" sx={{ height: "100%" }} className="">
            <div className="text-lg font-extrabold dark:text-neutral-100 text-neutral-800">
              <Link href={"/"}>Translator</Link>
            </div>
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              {session && (
                <Link href="/" className={classes.link}>
                  Home
                </Link>
              )}
              {session && (
                <HoverCard
                  width={600}
                  position="bottom"
                  radius="md"
                  shadow="md"
                  withinPortal
                >
                  <HoverCard.Target>
                      <Center inline>
                        <Box component="span" mr={5}>
                          Features
                        </Box>
                        <AiOutlineDown
                          size={16}
                          color={theme.fn.primaryColor()}
                        />
                      </Center>
                  </HoverCard.Target>
                  <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                    <Group position="apart" px="md">
                      <Text fw={500}>Features</Text>
                    </Group>
                    <Divider
                      my="sm"
                      mx="-md"
                      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                    />
                    <SimpleGrid cols={2} spacing={0}>
                      {links}
                    </SimpleGrid>
                    <div className={classes.dropdownFooter}></div>
                  </HoverCard.Dropdown>
                </HoverCard>
              )}

              <Link href="/contact" className={classes.link}>
                Contact
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
      </Container>


      <Drawer
        closeButtonProps={{
          children: <CloseButton aria-label="Close modal" />,
        }}
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

          <Link href="/contact" className={classes.link}>
            Contact
          </Link>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          {!session && (
            <Group position="center" grow pb="xl" px="md">
              <Link className="w-full" href={"/auth/login"}>
                <Button variant="default" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link className="w-full" href={"/auth/register"}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </>
  )
}
