import { ActionIcon } from "@mantine/core"
import { AiFillSound } from "react-icons/ai"

interface AudioButtonProps {
  audio: string
}

const AudioButton: React.FC<AudioButtonProps> = ({ audio }) => {
  return (
    <ActionIcon
      aria-label="Play sound"
      title="Play sound"
      onClick={() => {
        if (audio) {
          const sound = new Audio(audio)
          sound.play()
        }
      }}
    >
      <AiFillSound className="text-sky-500" />
    </ActionIcon>
  )
}

export default AudioButton
