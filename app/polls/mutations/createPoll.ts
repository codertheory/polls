import { resolver } from "blitz"
import db from "db"
import { CreatePoll } from "../validations"

export default resolver.pipe(resolver.zod(CreatePoll), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const poll = await db.poll.create({
    data: {
      name: input.name,
      options: {
        create: input.options.filter(({ option }) => option.length >= 1),
      },
    },
  })

  return poll
})
