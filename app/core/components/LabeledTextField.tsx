import { forwardRef, PropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Radio,
} from "@chakra-ui/react"

export interface LabeledTextFieldProps extends PropsWithoutRef<InputProps> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. */
  type?: "text" | "password" | "email" | "number" | "radio"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, name, type, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
    let InputComponent

    if (type === "radio") {
      // @ts-ignore
      InputComponent = <Radio disabled={isSubmitting} {...register(name)} {...props} />
    } else {
      InputComponent = <Input disabled={isSubmitting} {...register(name)} {...props} />
    }

    return (
      <FormControl isInvalid={error}>
        <FormLabel>{label}</FormLabel>
        {InputComponent}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledTextField
