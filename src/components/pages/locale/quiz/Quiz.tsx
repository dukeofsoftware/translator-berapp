"use client"

import { useCallback, useEffect, useState } from "react"
import { Button, Text } from "@mantine/core"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

interface QuizAnswer {
  answer: string
  correct: boolean
}

interface QuizQuestion {
  question: string
  answers: QuizAnswer[]
}

interface QuizInterface {
  level: string
  quiz: QuizQuestion[]
}
interface QuizProps extends QuizInterface {
  id: number
  setTrueAnswers: React.Dispatch<React.SetStateAction<number>>
  setFalseAnswers: React.Dispatch<React.SetStateAction<number>>
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>
  selectedAnswer: number | null
}
const Quiz: React.FC<QuizProps> = ({
  quiz,
  id,
  setTrueAnswers,
  setFalseAnswers,
  setSelectedAnswer,
  selectedAnswer,
}) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const handleCorrectAnswer = useCallback(() => {
    if (selectedAnswer === null) return

    if (quiz[id].answers[selectedAnswer].correct) {
      setIsCorrect(true)
      setTrueAnswers((prev: number) => prev + 1)
    } else {
      setIsCorrect(false)
      setFalseAnswers((prev: number) => prev + 1)
    }
  }, [selectedAnswer, quiz, id, setTrueAnswers, setFalseAnswers])
  const changeAnswer = (index: number) => {
    if (selectedAnswer) return

    setSelectedAnswer(index)
  }
  useEffect(() => {
    handleCorrectAnswer()
  }, [selectedAnswer, handleCorrectAnswer])

  return (
    <div>
      <Text fz={"lg"} fs={"italic"}>
        {" "}
        {quiz[id].question}
      </Text>
      <div className="grid grid-cols-2 gap-2 mt-7">
        {quiz[id].answers.map((answer, index) => {
          return (
            <button
              type="button"
              key={index}
              className={`
                                ${
                                  selectedAnswer === index && isCorrect === true
                                    ? "bg-green-500 hover:bg-green-600 focus:ring-green-800 dark:focus:ring-green-500"
                                    : selectedAnswer === index &&
                                      isCorrect === false
                                    ? "bg-red-500 hover:bg-red-600 focus:ring-red-800 dark:focus:ring-red-500"
                                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800 dark:focus:ring-indigo-500"
                                } w-full 
                                text-white  focus:ring focus:outline-none  font-medium rounded-lg  px-5 py-4 duration-200 text-center inline-flex items-center  mr-2 mb-2`}
              disabled={selectedAnswer !== null}
              onClick={() => changeAnswer(index)}
            >
              {selectedAnswer === index && isCorrect === true ? (
                <AiOutlineCheck className="text-white mr-2" />
              ) : selectedAnswer === index && isCorrect === false ? (
                <AiOutlineClose className="text-white" />
              ) : null}
              {answer.answer}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Quiz
