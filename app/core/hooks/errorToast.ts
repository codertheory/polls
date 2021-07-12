import { useToast } from "@chakra-ui/react"

const recursiveSearch = (obj, searchKey, results = []) => {
  const r = results
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (key === searchKey && typeof value !== "object") {
      // @ts-ignore
      r.push(value)
    } else if (typeof value === "object") {
      recursiveSearch(value, searchKey, r)
    }
  })
  return r
}

export const useErrorToast = (onClose?: () => void, id: string = "error-toast") => {
  const toast = useToast()

  return ({ message }: { message: string }) => {
    if (!toast.isActive(id))
      toast({
        id: id,
        title: "An error occurred.",
        description: `${message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        onCloseComplete: onClose,
      })
  }
}
