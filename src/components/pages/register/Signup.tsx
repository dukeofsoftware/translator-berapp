"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  Divider,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { MdAlternateEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { toast } from "react-toastify"

import { userRegisterSchema } from "@/lib/validation/userSchema"
import GoogleAuth from "@/components/auth/GoogleAuth"
import { Requirement, getStrength, requirements } from "@/components/ui"
import InputWithRequirements from "@/components/ui/InputWithRequirements"

const Signup = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(userRegisterSchema),
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.passwordConfirmation) {
      toast.error("Passwords do not match")
      return
    }
    setIsLoading(true)

    const response = await toast.promise(
      axios
        .post("/api/user", {
          username: data.username,
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          toast.error(error.response)
        }),
      {
        pending: "Sign up in progress",
        success: "Signed up successfully",
        error: "Failed to sign up",
      }
    )
    setIsLoading(false)
    router.push("/auth/login")
  }
  const [visible, { toggle }] = useDisclosure(false)
  const watchPassword = watch("password", "")

  const checks = requirements.map((requirement, index) => (
    <Requirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(watchPassword)}
    />
  ))
  const strength = getStrength(watchPassword)
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red"

  return (
    <div className="container flex flex-col items-center justify-center pt-24 ">
      <Paper
        shadow="md"
        p="md"
        className="grid w-full max-w-md gap-5   rounded-md "
      >
        <Title order={1} align="center">
          Sign Up
        </Title>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <TextInput
              placeholder="Username"
              label="Username"
              withAsterisk
              error={errors.username?.message?.toString()}
              {...register("username")}
            />
          </div>
          <div className="grid gap-2">
            <TextInput
              placeholder="Your name"
              label="Name"
              withAsterisk
              error={errors.name?.message?.toString()}
              {...register("name")}
            />
          </div>
          <div className="grid gap-2">
            <TextInput
              icon={<MdAlternateEmail />}
              placeholder="email"
              label="Email"
              withAsterisk
              error={errors.email?.message?.toString()}
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <InputWithRequirements
              placeholder="Password"
              type="password"
              id="password"
              error={errors.password?.message?.toString()}
              label="Password"
              icon={RiLockPasswordFill}
              visible={visible}
              onVisibilityChange={toggle}
              strength={strength}
              color={color}
              checks={checks}
              value={watchPassword}
              requirements={requirements}
              register={register}
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              label="Confirm password"
              defaultValue=""
              visible={visible}
              onVisibilityChange={toggle}
              withAsterisk
              icon={<RiLockPasswordFill />}
              error={errors.passwordConfirmation?.message?.toString()}
              {...register("passwordConfirmation")}
            />
          </div>
          <Button type="submit" variant="outline">
            Sign Up
          </Button>
        </form>
        <Divider />
        <GoogleAuth isLoading={isLoading}>Sign up with Google</GoogleAuth>

        <Text fz={"sm"} ta={"center"}>
          Already have an Account?{" "}
          <Link
            href={"/login"}
            className="font-bold text-sky-500 hover:underline "
          >
            Login
          </Link>
        </Text>
      </Paper>
    </div>
  )
}

export default Signup
