import { z } from "zod"

export const createOption = z.object({
  option: z.string(),
})

export const CreatePoll = z.object({
  name: z.string().nonempty(),
  options: z.array(createOption).nonempty().min(2),
})

export const CreateVote = z.object({
  pollId: z.string().nonempty(),
  optionId: z.string().nonempty(),
  ip: z.string().nonempty(),
})
