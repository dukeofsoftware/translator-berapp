"use client"

import { openAILanguageSelectOptions } from "@/constants"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Button,
  Container,
  Loader,
  Textarea,
  useMantineTheme,
} from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form"
import { Select } from "react-hook-form-mantine"
import { BsTranslate } from "react-icons/bs"
import { toast } from "react-toastify"

import { promptSchema } from "@/lib/validation/promptSchema"

const Prompt = () => {
  const theme = useMantineTheme()

  const mutation = useMutation({
    mutationFn: async (data: FieldValues) => {
      const axiosResponse = await axios
        .post("/api/translate/openai/translate", data)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err)
          toast.error(err)
          return err
        })
      if (axiosResponse) {
        setValue("translatedText", axiosResponse.choices[0].message.content)
      }

      return axiosResponse
    },
    retry: false,
    cacheTime: Infinity,
  })

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(promptSchema),
    defaultValues: {
      prompt: "",
      language: "",
    },
  })
  const onSubmit = (data: FieldValues) => {
    mutation.mutateAsync(data)
  }
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-2">
        <Select
          icon={<BsTranslate />}
          name="language"
          control={control}
          placeholder="Language"
          error={errors.language && errors.language.message?.toString()}
          data={openAILanguageSelectOptions}
        />
        <div className="flex  gap-2">
          <div className="grow w-full">
            <Textarea
              label="Prompt"
              placeholder="Prompt"
              error={errors.prompt && errors.prompt.message?.toString()}
              {...register("prompt")}
              icon={mutation.isLoading ? <Loader /> : <BsTranslate />}
              withAsterisk
              autosize
            />
          </div>
          <div className="grow w-full">
            <Textarea
              autosize
              {...register("translatedText")}
              label="Translated text"
              disabled
              styles={{
                input: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  cursor: "default",
                  ":disabled": {
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.colors.dark[8],
                    cursor: "default",
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                },
              }}
            />
          </div>
        </div>

        <Button variant="outline" type="submit" disabled={mutation.isLoading}>
          Translate
        </Button>
      </form>

      {mutation.isError && (
        <p className="text-red-500 text-sm">
          {
            // @ts-ignore
            mutation.error && mutation.error?.message.toString()
          }
        </p>
      )}
      {mutation.data?.error && (
        <p className="text-red-500 text-sm">
          {mutation.error && mutation.data.error}
        </p>
      )}
      {mutation.data && !mutation.data?.error && (
        <p className="text-red-500 text-sm">
          {mutation.data?.choices[0].finish_reason === "length" &&
            "The prompt is too long. Please shorten it."}
        </p>
      )}
    </Container>
  )
}

export default Prompt
