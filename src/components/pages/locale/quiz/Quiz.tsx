"use client"
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

import { Text, Button } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
interface QuizAnswer {
    answer: string;
    correct: boolean;
}

interface QuizQuestion {
    question: string;
    answers: QuizAnswer[];
}

interface QuizInterface {
    level: string;
    quiz: QuizQuestion[];
}
interface QuizProps extends QuizInterface {
    id: number;
    setTrueAnswers: React.Dispatch<React.SetStateAction<number>>;
    setFalseAnswers: React.Dispatch<React.SetStateAction<number>>;
    setSelectedAnswer: React.Dispatch<React.SetStateAction<number | null>>;
    selectedAnswer: number | null;
}
const Quiz: React.FC<QuizProps> = ({
    quiz, id,
    setTrueAnswers, setFalseAnswers,
    setSelectedAnswer, selectedAnswer,
}) => {
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const handleCorrectAnswer = useCallback(() => {
        if (selectedAnswer === null) return

        if (quiz[id].answers[selectedAnswer].correct) {
            setIsCorrect(true)
            setTrueAnswers((prev: number) => prev + 1)
        }
        else {
            setIsCorrect(false)
            setFalseAnswers((prev: number) => prev + 1)
        }

    }, [selectedAnswer, quiz, id, setTrueAnswers, setFalseAnswers,])
    const changeAnswer = (index: number) => {
        setSelectedAnswer(index)
    }
    useEffect(() => {
        handleCorrectAnswer()

    }, [selectedAnswer, handleCorrectAnswer])

    return (
        <div>
            <Text fz={"lg"} fs={"italic"}>  {quiz[id].question}</Text>
            <div className='grid grid-cols-2 gap-4'>
                {
                    quiz[id].answers.map((answer, index) => {
                        return (
                            <Button key={index}
                            variant='filled'
                                leftIcon={selectedAnswer === index && isCorrect === true ? <AiOutlineCheck className='text-white' /> :
                                    selectedAnswer === index && isCorrect === false ? <AiOutlineClose className='text-white' /> : null
                                }

                                className='duration-300 '

                                color={
                                    selectedAnswer === index && isCorrect === true ? "green" :
                                        selectedAnswer === index && isCorrect === false ? "red" :
                                        "blue"
                                } fullWidth mt="md" radius="md"
                                onClick={() => changeAnswer(index)}

                            >
                                {answer.answer}
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Quiz