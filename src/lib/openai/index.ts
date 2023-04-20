import { Configuration, OpenAIApi } from "openai"

const getOpenAIApiKey = () => {
  if (process.env.OPENAI_API_KEY) {
    return process.env.OPENAI_API_KEY
  } else {
    throw new Error("OPENAI_API_KEY env var is not set")
  }
}

const configuration = new Configuration({
  apiKey: getOpenAIApiKey(),
})

export const openai = new OpenAIApi(configuration)
