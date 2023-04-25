"use client"

import { useState } from "react"
import Link from "next/link"
import { ActionIcon, Button, Container, Divider, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs"

import Quiz from "@/components/pages/locale/quiz/Quiz"

interface Params {
  params: {
    slug: string[]
  }
}

const Page: React.FC<Params> = ({ params }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [trueAnswers, setTrueAnswers] = useState(0)
  const [falseAnswers, setFalseAnswers] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const getQuiz = async () => {
    const axiosResponse = await axios
      .get(`/api/translate/quiz`, {
        params: {
          language: params.slug[0],
          level: params.slug[1],
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log(err))
    console.log(axiosResponse)
    return axiosResponse
  }
  const { data, isLoading, isFetching } = useQuery({
    queryFn: getQuiz,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
  if (isLoading || isFetching) return <div>Loading...</div>
  if (!data) return <div>Quiz not found</div>

  return (
    <Container className="mt-12">
      <div className="w-full flex justify-between items-center">
        {data.quiz && currentQuestion > 0 ? (
          <ActionIcon
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion((prev) => prev - 1)
                setSelectedAnswer(null)
              }
            }}
          >
            <BsFillArrowLeftCircleFill />
          </ActionIcon>
        ) : null}
        <Title variant="h1">Question {currentQuestion + 1}</Title>
        {data.quiz && currentQuestion === data.quiz.length - 1 ? (
          <Button
            onClick={() => {
              setIsFinished(true)
            }}
            variant="h1"
          >
            Finish
          </Button>
        ) : (
          <ActionIcon
            onClick={() => {
              if (currentQuestion < data.quiz?.length - 1) {
                setCurrentQuestion((prev) => prev + 1)
                setSelectedAnswer(null)
              }
            }}
          >
            <BsFillArrowRightCircleFill />
          </ActionIcon>
        )}
      </div>
      <Divider className="my-4" />
      {data.quiz && isFinished ? (
        <div className="flex flex-col items-center gap-8">
          <Title variant="h2" align="center">
            You have answered{" "}
            <span className="text-green-500 text-bold">{trueAnswers}</span>{" "}
            questions correctly
          </Title>
          <Title variant="h2" align="center">
            You have answered{" "}
            <span className="text-red-500 font-bold">{falseAnswers}</span>{" "}
            questions incorrectly
          </Title>
          <Link href={"/berapp/quiz"} className="">
            <Button variant="h1" fullWidth size="lg">
              Go Back
            </Button>
          </Link>
        </div>
      ) : (
        <Quiz
          level={data.level}
          quiz={data.quiz}
          id={currentQuestion}
          setTrueAnswers={setTrueAnswers}
          setFalseAnswers={setFalseAnswers}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}
    </Container>
  )
}

export default Page
