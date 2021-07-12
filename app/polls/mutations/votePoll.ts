import { resolver } from "blitz"
import db from "db"
import { CreateVote } from "../validations"

export default resolver.pipe(resolver.zod(CreateVote), async (input, ctx) => {
  const vote = await db.pollVote.create({
    data: {
      metadata: {},
      ...input,
    },
  })
  return vote
})
