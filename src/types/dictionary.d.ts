export interface Meaning {
  partOfSpeech: string
  definitions: {
    definition: string
    example: string
    synonyms: string[]
    antonyms: string[]
  }[]
}

export interface Phonetic {
  text: string
  audio?: string
}

export interface Word {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  origin: string
  meanings: Meaning[]
}
