import dynamic from "next/dynamic"
import { Word } from "@/types/dictionary"
import { List, Paper, Title } from "@mantine/core"

const AudioButton = dynamic(() => import("./AudioButton"), { ssr: false })

interface DictionaryResponseProps {
  dictionary: Word[]
}

const DictionaryResponse: React.FC<DictionaryResponseProps> = ({
  dictionary,
}) => {
  return (
    <Paper className="mt-2">
      <div className="flex gap-2 items-center">
        <Title order={2} size={"h1"}>
          {dictionary[0].word}
        </Title>
        {dictionary[0].phonetics[0].audio && (
          <AudioButton audio={dictionary[0].phonetics[0].audio} />
        )}
      </div>
      <List listStyleType="disc">
        {dictionary[0].meanings?.map((meaning: any) => (
          <List.Item key={meaning?.partOfSpeech} >
            {meaning?.partOfSpeech}
            <List spacing={"md"} type="ordered" listStyleType="upperGreek" withPadding>

              {meaning?.definitions.map((definition: any) => (
                <List.Item key={definition.definition} >
                  {definition?.definition}
                  <List withPadding>
                    <List.Item icon={null} className="text-sky-600">{definition?.example}</List.Item>
                  </List>
                </List.Item>



              ))}
            </List>

          </List.Item>



        ))}
      </List >

    </Paper>
  )
}

export default DictionaryResponse
