import {
  Drawer as CDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react"
import { forwardRef } from "react"

export type DrawerProps = {
  isOpen: boolean
  onClose: () => void
}

const Drawer = ({ isOpen, onClose }: DrawerProps, ref) => {
  return (
    <CDrawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={ref}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </CDrawer>
  )
}

export default forwardRef(Drawer)
