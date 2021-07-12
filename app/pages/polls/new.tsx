import { BlitzPage, Routes, useMutation, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPoll from "app/polls/mutations/createPoll"
import { FORM_ERROR, PollForm } from "app/polls/components/PollForm"
import { CreatePoll } from "../../polls/validations"

const NewPollPage: BlitzPage = () => {
  const router = useRouter()
  const [createPollMutation] = useMutation(createPoll)

  return (
    <div>
      <h1>Create New Poll</h1>

      <PollForm
        submitText="Create Poll"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreatePoll}
        initialValues={{
          options: [{}, {}, {}],
        }}
        onSubmit={async (values) => {
          try {
            const poll = await createPollMutation(values)
            await router.push(Routes.ShowPollPage({ pollId: poll.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
        requireCaptcha
      />
    </div>
  )
}

NewPollPage.getLayout = (page) => <Layout title={"Create New Poll"}>{page}</Layout>

export default NewPollPage
