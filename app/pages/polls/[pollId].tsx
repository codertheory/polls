import { Suspense } from "react"
import { BlitzPage, Head, Link, Routes, useMutation, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPoll from "app/polls/queries/getPoll"
import { Center, Heading, VStack } from "@chakra-ui/react"
import { PollVoteForm } from "../../polls/components/PollVoteForm"
import { createOption } from "../../polls/validations"
import { FormProps } from "../../core/components/Form"
import CreateVote from "../../polls/mutations/votePoll"

export const Poll = () => {
  const pollId = useParam("pollId", "string")
  const [poll, { refetch }] = useQuery(getPoll, { id: pollId })
  const [vote] = useMutation(CreateVote)
  const totalVotes = poll?._count?.votes ?? 0
  const formProps: FormProps<any> = {
    submitText: "Vote",
    schema: createOption,
    onSubmit: async (values) => {
      const response = await window.fetch("/api/ipinfo")
      const data = await response.json()
      await vote({
        pollId: pollId!,
        optionId: values.option,
        ...data,
      })
      await refetch()
    },
    onReset: async (event) => {
      console.log("Reset!")
    },
    requireCaptcha: false,
  }

  return (
    <>
      <Head>
        <title>{poll.name}</title>
      </Head>
      <Center w="100%">
        <VStack w="100%">
          <Heading>
            {poll.name} - {totalVotes} Votes
          </Heading>
          <PollVoteForm options={poll.options} totalVotes={totalVotes} props={formProps} />
        </VStack>
      </Center>
    </>
  )
}

const ShowPollPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PollsPage()}>
          <a>Polls</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Poll />
      </Suspense>
    </div>
  )
}

ShowPollPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPollPage
