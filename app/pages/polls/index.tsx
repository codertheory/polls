import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPolls from "app/polls/queries/getPolls"
import { useCurrentUser } from "../../core/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const PollsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ polls, hasMore }] = usePaginatedQuery(getPolls, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: { creatorId: useCurrentUser()?.id },
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <Link href={Routes.ShowPollPage({ pollId: poll.id })}>
              <a>{poll.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const PollsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Polls</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPollPage()}>
            <a>Create Poll</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PollsList />
        </Suspense>
      </div>
    </>
  )
}

PollsPage.authenticate = true
PollsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PollsPage
