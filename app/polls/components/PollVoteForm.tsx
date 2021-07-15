import Form, { FormProps } from "../../core/components/Form"
import { z } from "zod"
import { Box, HStack, Progress, Text, useRadio, useRadioGroup, VStack } from "@chakra-ui/react"
import { useController, useFormContext } from "react-hook-form"

export type PollOption = {
  id: string
  option: string
  _count: {
    votes: number
  } | null
}

function PollVoteOption(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        w={"300px"}
        cursor="pointer"
        borderWidth="3px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

function PollVoteRadioGroup({
  options,
  totalVotes,
}: {
  options: PollOption[]
  totalVotes: number
}) {
  const { control } = useFormContext()
  const data = useController({
    name: "option",
    control,
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "options",
    value: data.field.value,
    onChange: data.field.onChange,
  })

  const group = getRootProps()

  return (
    <VStack pt={6} {...group}>
      {options.map((option, index) => {
        const radio = getRadioProps({ value: option.id })
        const votes = option._count!.votes
        const calc = votes / totalVotes
        const percentage = !isNaN(calc) ? calc : 0
        return (
          <PollVoteOption key={option.id} {...radio}>
            <HStack>
              <Text alignContent={"flex-start"}>{option.option}</Text>
              <Text alignContent="flex-end">{votes} Votes</Text>
            </HStack>
            <HStack>
              <Progress width="100%" value={percentage * 100} max={100} />
              <Text>{(percentage * 100).toFixed(0)}%</Text>
            </HStack>
          </PollVoteOption>
        )
      })}
    </VStack>
  )
}

export function PollVoteForm<S extends z.ZodType<any, any>>({
  options,
  totalVotes,
  props,
}: {
  options: PollOption[]
  totalVotes: number
  props: FormProps<S>
}) {
  return (
    <Form<S> {...props}>
      <PollVoteRadioGroup options={options} totalVotes={totalVotes} />
    </Form>
  )
}
