"use client"

import { useState } from "react"
import { Box, PasswordInput, Popover, Progress, TextInput } from "@mantine/core"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons"

import { Requirement, RequirementType } from "@/components/ui"

interface InputWithRequirementsProps {
  id: string

  placeholder?: string | undefined
  label?: string | undefined
  error?: string | undefined
  type: "password" | "text" | "email" | undefined
  icon: IconType
  color?: string | undefined
  strength: number
  value: string
  checks: any
  requirements: RequirementType[]
  visible: boolean | undefined
  onVisibilityChange: (visible: boolean) => void
  register: UseFormRegister<FieldValues>
}

const InputWithRequirements: React.FC<InputWithRequirementsProps> = ({
  id,
  placeholder,
  label,
  error,
  type,
  icon: Icon,
  color,
  strength,
  value,
  checks,
  register,
  requirements,
  ...props
}) => {
  const [popoverOpened, setPopoverOpened] = useState(false)

  const colors = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red"

  return (
    <Box mx="auto" className="w-full">
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: "pop" }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            {type === "password" ? (
              <PasswordInput
                withAsterisk
                label={label}
                placeholder={placeholder}
                error={error}
                icon={<Icon />}
                {...props}
                id={id}
                {...register(id, { required: true })}
              />
            ) : (
              <TextInput
                id={id}
                withAsterisk
                label={label}
                placeholder={placeholder}
                error={error}
                icon={<Icon />}
                {...props}
                {...register(id, { required: true })}
              />
            )}
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color || colors} value={strength} size={5} mb="xs" />
          {checks}
          {/*         <Requirement label="Includes at least 6 characters" meets={value.length > 5} />
           */}{" "}
        </Popover.Dropdown>
      </Popover>
    </Box>
  )
}

export default InputWithRequirements
