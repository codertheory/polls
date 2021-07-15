import { CgSun } from "react-icons/cg"
import { BiMoon } from "react-icons/bi"
import { Icon, IconButton, useColorMode } from "@chakra-ui/react"

export const ThemeModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      aria-label="Toggle Color scheme"
      variant="ghost"
      icon={colorMode === "light" ? <Icon as={BiMoon} /> : <Icon as={CgSun} />}
      onClick={toggleColorMode}
    />
  )
}
