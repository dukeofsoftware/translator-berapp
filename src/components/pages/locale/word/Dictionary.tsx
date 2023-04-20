import { dictionarySchema } from "@/lib/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import { Container, Flex, Paper, Tooltip } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { FieldValues, useForm } from "react-hook-form"
import { TextInput } from "react-hook-form-mantine"
import { BsTranslate } from "react-icons/bs"
import {GrAlert} from "react-icons/gr"

const Dictionary = () => {

    const {
        handleSubmit,
        control,
        formState: { errors },
        register
    } = useForm<FieldValues>({
        resolver: yupResolver(dictionarySchema),
    })
    const {
        data: dictionary,
    } = useQuery({
        queryKey: ["dictionary"],

    })

    const getWord = async (data: FieldValues) => {

    }
    const onSubmit = async (data: FieldValues) => {

    }
    return (
        <Container>
            <Paper>
                <Flex align={"center"}  >
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <TextInput
                            {...register("word")}
                            control={control}
                            placeholder="word"
                            error={errors.word && errors.word.message?.toString()}
                            label="Word"
                            radius={"xl"}
                            size="lg"
                            icon={<BsTranslate />}
                            withAsterisk
                            rightSection={
                                <Tooltip label="This dictionary only supports english words" position="top-end" withArrow>
                                    <div>
                                        <GrAlert size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                        />
                    </form>
                    
                </Flex>

            </Paper>

        </Container>
    )
}

export default Dictionary