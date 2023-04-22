"use client"

import dynamic from "next/dynamic"

import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Paper, TextInput, Tooltip } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form"
import { BsSearch } from "react-icons/bs"
import { GrAlert } from "react-icons/gr"
import { toast } from "react-toastify"

import { dictionarySchema } from "@/lib/validation"

const DictionaryResponse = dynamic(() => import("./DictionaryResponse"), {
  ssr: false,
})

const Dictionary = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FieldValues>({
    resolver: yupResolver(dictionarySchema),
  })
  const getWord = async (data: FieldValues) => {
    const axiosResponse = await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
        toast.error(err)
        return err
      })
    console.log(axiosResponse)
    return axiosResponse
  }
  const { data: dictionary, mutateAsync } = useMutation({
    mutationFn: getWord,
    mutationKey: ["dictionary"],
  })

  const onSubmit = async (data: FieldValues) => {
    mutateAsync(data)
  }
  return (
    <Container>
      <Paper className="flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
          <TextInput
            className="grow w-full"
            {...register("word")}
            placeholder="word"
            error={errors.word && errors.word.message?.toString()}
            radius={"xl"}
            size="lg"
            icon={<BsSearch />}
            rightSection={
              <Tooltip
                label="This dictionary only supports english words"
                position="top-end"
                withArrow
              >
                <div>
                  <GrAlert
                    size="1rem"
                    style={{ display: "block", opacity: 0.75 }}
                    className="text-red-500"
                  />
                </div>

              </Tooltip>
            }
          />
          <Button
            type="submit"
            variant="outline"
            color="blue"
            radius={"md"}
            size="lg"
          >
            Search
          </Button>
        </form>
      </Paper>
      {dictionary && <DictionaryResponse dictionary={dictionary} />}

    </Container>
  )
}

export default Dictionary
