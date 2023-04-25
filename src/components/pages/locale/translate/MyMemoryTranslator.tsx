"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Paper, useMantineTheme } from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Select, Textarea } from "react-hook-form-mantine"
import { BsTranslate } from "react-icons/bs"
import { toast } from "react-toastify"

import { myMemorySchema } from "@/lib/validation"

const MyMemoryTranslator = () => {
  const theme = useMantineTheme()

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const axiosResponse = await axios
        .get("/api/translate/memory")
        .then((res) => res.data)
        .catch((err) => toast.error(err.message))
      axiosResponse.languages = axiosResponse.languages.map((language: any) => {
        return {
          label: language.name,
          value: language.code,
        }
      })

      return axiosResponse
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  })

  const getTranslate = async (data: FieldValues) => {
    const axiosResponse = await axios
      .post("/api/translate/memory", data)
      .then((res) => res.data)
      .catch((err) => toast.error(err.message))
    if (axiosResponse.data.translatedText) {
      setValue("translatedText", axiosResponse.data.translatedText)
    }

    return axiosResponse
  }

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: getTranslate,
    mutationKey: ["myMemory"],
  })
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(myMemorySchema),
  })
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await mutateAsync(data)
  }
  return (
    <Container>
      <Paper shadow="xs" p="md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  gap-2 items-center my-12 flex-col w-full"
        >
          <div className="flex md:flex-row flex-col gap-2 w-full">
            <Select
              disabled={isLoading}
              withAsterisk
              name="languageFrom"
              label="From"
              placeholder="Select language"
              data={categories?.languages! || []}
              searchable
              clearable
              maxDropdownHeight={280}
              control={control}
              error={errors.languageFrom?.message?.toString()}
            />
            <Select
              error={errors.languageTo?.message?.toString()}
              disabled={isLoading}
              withAsterisk
              name="languageTo"
              label="To"
              placeholder="Select language"
              data={categories?.languages! || []}
              searchable
              clearable
              maxDropdownHeight={280}
              control={control}
            />
          </div>
          <div className="flex flex-col  md:flex-rowgap-2 w-full">
            <Textarea
              placeholder="Enter text to translate"
              label="Text to translate"
              withAsterisk
              error={errors.text?.message?.toString()}
              minRows={5}
              name="text"
              control={control}
              autosize
            />

            <Textarea
              autosize
              name="translatedText"
              label="Translated text"
              minRows={5}
              control={control}
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
          <Button
            disabled={isLoading}
            loading={isLoading}
            leftIcon={<BsTranslate />}
            type="submit"
            variant="outline"
            color="blue"
          >
            Translate
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default MyMemoryTranslator
