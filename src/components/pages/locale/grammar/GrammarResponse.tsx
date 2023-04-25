"use client"

import { List, Paper, Text } from "@mantine/core"

interface GrammarResponseType {
  data: LanguageToolResponse
}
const GrammarResponse: React.FC<GrammarResponseType> = ({ data }) => {
  return (
    <Paper shadow="sm">
      {data.matches &&
        data.matches.map((match: MatchType) => (
          <List listStyleType="disc" spacing={"sm"}>
            <List.Item>
              <Text>
                {match.sentence.slice(0, match.offset)}
                <span className="text-red-500">
                  {match.sentence.slice(
                    match.offset,
                    match.offset + match.length
                  )}
                </span>
                {match.sentence.slice(match.offset + match.length)}
              </Text>
              <List.Item>{match.message}</List.Item>

              <List withPadding listStyleType="decimal" spacing={"sm"}>
                <Text>Fix:</Text>
                {match.replacements.map((replacement) => (
                  <List.Item>{replacement.value}</List.Item>
                ))}
              </List>
            </List.Item>
          </List>
        ))}
    </Paper>
  )
}

export default GrammarResponse
