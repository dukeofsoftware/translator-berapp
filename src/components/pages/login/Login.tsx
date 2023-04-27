"use client"

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
import { useMutation } from "@tanstack/react-query"
import { signIn } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { MdAlternateEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { toast } from "react-toastify"

import { userLoginSchema } from "@/lib/validation/userSchema"
import GoogleAuth from "@/components/auth/GoogleAuth"
import { AiFillEyeInvisible ,AiFillEye} from "react-icons/ai"

const Login = () => {

  const signInWithCredentials = async (data: FieldValues) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).catch((error) => {
        toast.error(error.message)
      })
      if (response?.error || !response?.ok) {
        throw new Error(response?.error)
      }
      return response as any
    } catch (error) {
      return error
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await mutateAsync(data)
  }
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(userLoginSchema),
  })

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: signInWithCredentials,
    onError: (error: { message: string }) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success("Login Successfull")
        router.refresh()
        router.push("/berapp")
      }
    },
  })
  const router = useRouter()

  return (
    <section className="container flex flex-col items-center justify-center pt-24  ">
      <Paper
        shadow="md"
        p="md"
        className="grid w-full max-w-md gap-5  rounded-md  "
      >
        <Title order={1} align="center">
          Login
        </Title>
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <TextInput
              placeholder="Email"
              type="email"
              withAsterisk
              error={errors.email?.message?.toString()}
              label="Email"
              {...register("email")}
              icon={<MdAlternateEmail />}
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              placeholder="Password"
              type="password"
              withAsterisk
              error={errors.password?.message?.toString()}
              label="Password"
              {...register("password")}
              icon={<RiLockPasswordFill />}
              visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <AiFillEyeInvisible size={size} /> : <AiFillEye size={size} />
            }
            />
          </div>
          <Button variant={"outline"} type="submit" loading={isLoading}>
            Login
          </Button>
        </form>
        <Divider my="sm" />

        <GoogleAuth isLoading={isLoading}>Login with Google</GoogleAuth>
        <div className="flex  items-center justify-center">
          <Text fz="sm" ta={"center"}>
            Don&apos;t have an Account?{" "}
            <Link
              href={"/auth/register"}
              className="font-bold text-sky-500 hover:underline "
            >
              Register
            </Link>
          </Text>
        </div>
      </Paper>
    </section>
  )
}

export default Login
