import React, { createRef, PropsWithoutRef, ReactNode, useState } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useErrorToast } from "../hooks/errorToast"
import ReCAPTCHA from "react-google-recaptcha"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  requireCaptcha?: boolean
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string

  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  onReset,
  requireCaptcha = true,
  ...props
}: FormProps<S>) {
  const errorHandler = useErrorToast()
  const recaptchaRef = createRef<ReCAPTCHA>()
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  const reset = (event) => {
    if (onReset) onReset(event)
    ctx.reset()
    requireCaptcha ? recaptchaRef?.current?.reset() : null
  }

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(
          async (values) => {
            requireCaptcha ? recaptchaRef?.current?.execute() : null
            const result = (await onSubmit(values)) || {}
            for (const [key, value] of Object.entries(result)) {
              if (key === FORM_ERROR) {
                setFormError(value)
              } else {
                ctx.setError(key as any, {
                  type: "submit",
                  message: value,
                })
              }
            }
          },
          (data) => {
            console.error(data)
            errorHandler({
              message: data.toString(),
            })
          }
        )}
        className="form"
        {...props}
      >
        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError && (
          <div role="alert" style={{ color: "red" }}>
            {formError}
          </div>
        )}
        <ButtonGroup variant="outline" spacing="6">
          <Button colorScheme="grey" onClick={reset}>
            Clear
          </Button>

          {submitText && (
            <Button
              type="submit"
              isLoading={ctx.formState.isSubmitting}
              loadingText="Submitting"
              colorScheme="teal"
            >
              {submitText}
            </Button>
          )}
        </ButtonGroup>
        {requireCaptcha ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_API as string}
            size="invisible"
            badge={"bottomright"}
          />
        ) : null}
      </form>
    </FormProvider>
  )
}

export default Form
