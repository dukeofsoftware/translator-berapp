"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  Flex,
  Group,
  Input,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
  createStyles,
  rem,
} from "@mantine/core"
import { useId } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form"
import { AiFillGithub, AiFillPhone, AiOutlineMail } from "react-icons/ai"
import { IMaskInput } from "react-imask"
import { toast } from "react-toastify"

import { contactSchema } from "@/lib/validation/contactSchema"
import bg from "./waves.svg"

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm")

  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      border: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: rem(-12),
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    contacts: {
      boxSizing: "border-box",
      position: "relative",
      borderRadius: theme.radius.lg,
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  }
})

export default function Contact() {
  const contactInformation = [
    {
      title: "Email",
      value: "kozanfurkanemre@gmail.com",
      icon: AiOutlineMail,
    },
    {
      title: "Phone",
      value: "+90 (505) 058 81 23",
      icon: AiFillPhone,
    },
    {
      title: "Github",
      value: "dukeofsoftware",
      icon: AiFillGithub,
    },
  ]
  const sendContact = async (data: FieldValues) => {
    const axiosResponse = await axios
      .post("/api/contact", data)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return error
      })

    return axiosResponse
  }
  const { classes } = useStyles()
  const id = useId()

  const { mutateAsync, isError, isLoading } = useMutation({
    mutationFn: sendContact,
    retry: 0,

    onSuccess: () => {
      toast.success("Your message has been sent successfully!")
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(contactSchema),
  })
  const onSubmit = (data: FieldValues) => {
    mutateAsync(data)
  }
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Contact information
          </Text>
          {contactInformation.map((item, index) => (
            <div>
              <Flex justify={"center"} gap={"md"}>
                <item.icon />
                <Flex direction={"column"} className="grow" gap="sm">
                  <Text c="#fff" key={index}>
                    {item.title}
                  </Text>
                  <Text c="#fff" key={index}>
                    {item.value}
                  </Text>
                </Flex>
              </Flex>
            </div>
          ))}
        </div>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Text fz="lg" fw={700} className={classes.title}>
            Get in touch
          </Text>

          <div className={classes.fields}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
              <TextInput
                withAsterisk
                error={errors.name?.message?.toString()}
                {...register("name")}
                label="Your name"
                placeholder="Your name"
              />
              <TextInput
                label="Your email"
                withAsterisk
                {...register("email")}
                placeholder="hello@gmail.com"
              />
            </SimpleGrid>
            <Input.Wrapper id={id} label="Your phone">
              <Input<any>
                error={errors.phone?.message?.toString()}
                {...register("phone")}
                component={IMaskInput}
                mask="+7 (000) 000-00-00"
                id={id}
                placeholder="Your phone"
              />
            </Input.Wrapper>
            <TextInput
              mt="md"
              label="Subject"
              error={errors.subject?.message?.toString()}
              {...register("subject")}
              withAsterisk
              placeholder="Subject"
            />

            <Textarea
              error={errors.message?.message?.toString()}
              withAsterisk
              {...register("message")}
              mt="md"
              label="Your message"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group position="right" mt="md">
              <Button
                type="submit"
                className={classes.control}
                loading={isLoading}
              >
                Send message
              </Button>
            </Group>
          </div>
          {isError && <Text c="red">Something went wrong</Text>}
        </form>
      </div>
    </Paper>
  )
}
