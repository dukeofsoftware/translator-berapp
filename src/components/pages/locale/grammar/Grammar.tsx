"use client"

import dynamic from "next/dynamic"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Textarea } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, useForm } from "react-hook-form"
import { Select } from "react-hook-form-mantine"
import { BsTranslate } from "react-icons/bs"
import { toast } from "react-toastify"

import { grammarSchema } from "@/lib/validation/grammarSchema"

const GrammarResponse = dynamic(() => import("./GrammarResponse"), {
  ssr: false,
})

const Grammar = () => {
  const getLanguages = async () => {
    const axiosResponse = await axios
      .get("/api/translate/grammar")
      .then((res) => {
        res.data = res.data.map((language: any) => {
          return {
            label: language.name,
            value: language.code,
          }
        })
        return res.data
      })
      .catch((err) => {
        console.log(err)
        toast.error(err)
      })

    return axiosResponse
  }
  const getGrammarMistakes = async (data: FieldValues) => {
    const axiosResponse = await axios
      .post("/api/translate/grammar", data)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err)
        toast.error(err)
      })

    return axiosResponse
  }
  const { data: languages, isLoading } = useQuery({
    queryFn: getLanguages,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const {
    isLoading: mutateLoading,
    data,
    mutateAsync,
  } = useMutation({
    mutationFn: getGrammarMistakes,
  })

  const {
    handleSubmit,
    register,
    control,

    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(grammarSchema),
  })

  const onSubmit = (data: FieldValues) => {
    mutateAsync(data)
  }
  return (
    <Container>
      <form
        className="mt-16 flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select
          icon={<BsTranslate />}
          name="lang"
          disabled={isLoading}
          label="Language"
          control={control}
          placeholder="Select language"
          error={errors.langCode && errors.langCode?.message?.toString()}
          withAsterisk
          data={languages ? languages : []}
          maxDropdownHeight={280}
          searchable
          clearable
        />
        <Textarea
          placeholder=""
          label="Sentences"
          withAsterisk
          {...register("text")}
          minRows={4}
          error={errors.text?.message?.toString()}
          autosize
        />
        <Button variant="outline" type="submit">
          Check
        </Button>
        {data && <GrammarResponse data={data} />}
      </form>
    </Container>
  )
}

export default Grammar
