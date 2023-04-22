import { AiFillBook, AiOutlineCheckCircle } from "react-icons/ai"
import { HiTranslate } from "react-icons/hi"
import { MdOutlineQuiz } from "react-icons/md"
import { TbBrandOpenai } from "react-icons/tb"
import { RiMoneyPoundCircleLine } from "react-icons/ri"
export const features = [
  {
    icon: AiOutlineCheckCircle,
    title: "Grammar Check",
    description: "Check your grammar and spelling",
    hrefSession: "/berapp/grammar",
    href: "/features/grammar",

  },
  {
    icon: TbBrandOpenai,
    title: "AI Tools",
    description:
      "Artifical Intelligence grammar checker, translation, and more",
    hrefSession: "/berapp/ai",
    href: "/features/ai",

  },
  {
    icon: AiFillBook,
    title: "Dictionary",
    description: "Search for words and definitions",
    hrefSession: "/berapp/dictionary",

  },
  {
    icon: MdOutlineQuiz,
    title: "Quiz ",
    description: "Test your knowledge with our quizzes",
    hrefSession: "/berapp/quiz",
    href: "/features/quiz",

  },
  {
    icon: HiTranslate,
    title: "Translate",
    description: "Translate text into languages",
    hrefSession: "/berapp/translate",
    href: "/features/translate",

  },
  {
    icon: RiMoneyPoundCircleLine,
    title: "Free for everyone",
    description:
      "Free for everyone to use and learn from our tools and resources",
    hrefSession: "/berapp/translate",
    href: "/features/translate",
  },
]