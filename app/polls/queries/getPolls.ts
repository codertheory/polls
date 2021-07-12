import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPollsInput
  extends Pick<Prisma.PollFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPollsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: polls,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.poll.count({ where }),
      query: (paginateArgs) => db.poll.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      polls,
      nextPage,
      hasMore,
      count,
    }
  }
)
