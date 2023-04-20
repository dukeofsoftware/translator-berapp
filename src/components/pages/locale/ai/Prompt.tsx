"use client"

import { openAILanguageSelectOptions } from "@/constants"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextInput } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form"
import { Select } from "react-hook-form-mantine"
import { BsTranslate } from "react-icons/bs"

import { promptSchema } from "@/lib/validation/promptSchema"

const Prompt = () => {
  const mutation = useMutation({
    mutationFn: (data: FieldValues) => {
      return axios.post("/api/openai", data)
    },
  })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(promptSchema),
    defaultValues: {
      prompt: "",
      language: "",
    },
  })
  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div>
          <TextInput
            placeholder="Prompt"
            error={errors.prompt && errors.prompt.message?.toString()}
            {...register("prompt")}
          />
        </div>

        <Select
          name="language"
          icon={<BsTranslate />}
          control={control}
          placeholder="Language"
          error={errors.language && errors.language.message?.toString()}
          data={openAILanguageSelectOptions}
        />

        <Button variant="outline" type="submit" disabled={mutation.isLoading}>
          Gönder
        </Button>
      </form>

      {mutation.isError && (
        <p className="text-red-500 text-sm">
          {
            // @ts-ignore
            mutation.error?.message.toString()
          }
        </p>
      )}
    </div>
  )
}

export default Prompt
