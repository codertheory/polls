import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import { useFieldArray, useFormContext } from "react-hook-form"
export { FORM_ERROR } from "app/core/components/Form"

export function PollOptionFieldArray() {
  const { control } = useFormContext()
  const { fields, insert } = useFieldArray({
    control,
    // control props comes from useForm (optional: if you are using FormContext)
    name: "options", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
    shouldUnregister: true,
  })

  const onChange = (index) => async (event: any) => {
    if (index + 1 === fields.length) {
      insert(
        index + 1,
        {
          option: "",
        },
        {
          shouldFocus: false,
        }
      )
    }
  }

  return (
    <>
      {fields.map((data, index) => {
        return (
          <LabeledTextField
            key={data.id}
            name={`options.${index}.option` as const}
            label={`Option ${index + 1}`}
            placeholder={`Option ${index + 1}`}
            onChange={onChange(index)}
          />
        )
      })}
    </>
  )
}

export function PollForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <PollOptionFieldArray />
    </Form>
  )
}
