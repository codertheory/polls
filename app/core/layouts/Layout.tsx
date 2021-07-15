import { ReactNode } from "react"
import { Head } from "blitz"
import { Box, Divider } from "@chakra-ui/react"
import Topbar from "./Topbar"
import Footer from "./Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "polls"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Topbar />
        <Divider />
        <Box
          sx={{
            flex: "1 1 auto",
            p: 3,
          }}
        >
          {children}
        </Box>
        <Divider />
        <Footer />
      </Box>
    </>
  )
}

export default Layout
