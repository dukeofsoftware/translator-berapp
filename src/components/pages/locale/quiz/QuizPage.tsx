"use client"
import { Title } from "@mantine/core"
import QuizCard from "./QuizCard"
const QuizPage = () => {

  const quizzes = {
    english: {
      badge: "English",
      quizzes: [
        {
          title: "A1 Level",
          description: "This is a quiz for A1 level",
          imageSrc: "/english.jpeg",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/english/a1"

        },
        {
          title: "A2 Level",
          description: "This is a quiz for A2 level",
          imageSrc: "/english.jpeg",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/english/a2"

        },
        {
          title: "B1 Level",
          description: "This is a quiz for B1 level",
          imageSrc: "/english.jpeg",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/english/b1"

        },
        {
          title: "B2 Level",
          description: "This is a quiz for B2 level",
          imageSrc: "/english.jpeg",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/english/b2"

        },
        {
          title: "C1 Level",
          description: "This is a quiz for C1 level",
          imageSrc: "/english.jpeg",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/english/c1"

        },


      ]



    },

    german: {
      badge: "German",
      quizzes: [
        {
          title: "A1 Level",
          description: "This is a quiz for A1 level",
          imageSrc: "/deutsch.png",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/german/a1"
        },
        {
          title: "A2 Level",
          description: "This is a quiz for A2 level.",
          imageSrc: "/deutsch.png",
          buttonTitle: "Start Quiz",
          buttonHref: "/berapp/quiz/german/a2"
        },


      ]
    },
  }

  return (
    <div>
      <Title variant={"h1"} align="center" className="my-8">Quizzes</Title>
      <Title variant={"h2"} align="center" color="blue" className="my-6">English</Title>

      <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3  gap-4">

        {quizzes.english.quizzes.map((quiz, index) => (
          <div key={index}>
            <QuizCard

              title={quiz.title}
              description={quiz.description}
              imageSrc={quiz.imageSrc}
              buttonTitle={quiz.buttonTitle}
              buttonHref={quiz.buttonHref}
              badge={quizzes.english.badge}
            />
          </div>
        ))}


      </div>
      <Title variant={"h2"} align="center" color="blue" className="my-6">German</Title>

      <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3  gap-4">

        {quizzes.german.quizzes.map((quiz, index) => (
          <div key={index}>
            <QuizCard

              title={quiz.title}
              description={quiz.description}
              imageSrc={quiz.imageSrc}
              buttonTitle={quiz.buttonTitle}
              buttonHref={quiz.buttonHref}
              badge={quizzes.english.badge}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizPage