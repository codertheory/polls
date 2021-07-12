import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePoll = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeletePoll), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const poll = await db.poll.deleteMany({ where: { id } })

  return poll
})
