import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePoll = z.object({
  id: z.string(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePoll),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const poll = await db.poll.update({
      where: { id },
      data,
      include: {
        options: true,
      },
    })

    return poll
  }
)
