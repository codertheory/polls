import Form, { FormProps } from "../../core/components/Form"
import { z } from "zod"
import { Box, HStack, Progress, RadioGroup, Text } from "@chakra-ui/react"
import LabeledTextField from "../../core/components/LabeledTextField"
import { useController } from "react-hook-form"

export type PollOption = {
  id: string
  option: string
  _count: {
    votes: number
  } | null
}

function PollVoteRadioGroup({ children }) {
  const data = useController({
    name: "option",
    shouldUnregister: true,
  })

  return (
    <RadioGroup onChange={data.field.onChange} value={data.field.value}>
      {children}
    </RadioGroup>
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
      <PollVoteRadioGroup>
        {options.map((option, index) => {
          const votes = option._count!.votes
          const calc = votes / totalVotes
          const percentage = !isNaN(calc) ? calc : 0
          return (
            <Box
              key={index}
              w="100%"
              p={5}
              shadow="md"
              borderWidth="1px"
              flex="1"
              borderRadius="md"
            >
              <HStack width="100%">
                <LabeledTextField
                  name={"option"}
                  type={"radio"}
                  label={option.option}
                  value={option.id}
                />
                <Text alignContent="flex-end">{votes} Votes</Text>
              </HStack>
              <HStack>
                <Progress width="100%" value={percentage * 100} max={100} />
                <Text>{(percentage * 100).toFixed(0)}%</Text>
              </HStack>
            </Box>
          )
        })}
      </PollVoteRadioGroup>
    </Form>
  )
}
