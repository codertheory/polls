import { BlitzApiHandler, BlitzApiRequest, BlitzApiResponse } from "blitz"
import IPinfoWrapper from "node-ipinfo"

const ipinfoWrapper = new IPinfoWrapper(process.env.IPINFO_API_KEY as string)

const handler: BlitzApiHandler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const ip = req.headers["forwarded"] || req.headers.from || req.headers.host
  const response = await ipinfoWrapper.lookupIp(ip!).catch((error) => {
    return { ip }
  })

  res.status(200).json({
    userAgent: req.headers["user-agent"],
    ...response,
  })
}

export default handler
