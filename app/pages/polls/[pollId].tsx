import { Suspense } from "react"
import { BlitzPage, Head, useMutation, useParam, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPoll from "app/polls/queries/getPoll"
import { Center, Divider, Flex, Heading } from "@chakra-ui/react"
import { PollVoteForm } from "../../polls/components/PollVoteForm"
import { createOption } from "../../polls/validations"
import { FormProps } from "../../core/components/Form"
import CreateVote from "../../polls/mutations/votePoll"
import { Card } from "../../core/components/Card"
import { LoadingSpinner } from "../../core/components/LoadingSpinner"
import { useChannel, useEvent, useTrigger } from "@harelpls/use-pusher"

export const Poll = () => {
  const pollId = useParam("pollId", "string")
  const channel = useChannel(pollId)
  const trigger = useTrigger(pollId!)
  const [poll, { refetch }] = useQuery(getPoll, { id: pollId })
  const [vote] = useMutation(CreateVote)
  const totalVotes = poll?._count?.votes ?? 0

  useEvent(channel, "poll-vote", async (data) => {
    console.log("Yolo")
    await refetch()
  })

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
      await trigger("poll-vote", { pollId })
    },
    requireCaptcha: false,
  }

  return (
    <Center>
      <Head>
        <title>{poll.name}</title>
      </Head>
      <Flex>
        <Card>
          <Heading p={4}>
            {poll.name} - {totalVotes} Votes
          </Heading>
          <Divider />
          <PollVoteForm options={poll.options} totalVotes={totalVotes} props={formProps} />
        </Card>
      </Flex>
    </Center>
  )
}

const ShowPollPage: BlitzPage = () => {
  return (
    <div>
      <Suspense
        fallback={
          <Center>
            <LoadingSpinner />
          </Center>
        }
      >
        <Poll />
      </Suspense>
    </div>
  )
}

ShowPollPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPollPage
