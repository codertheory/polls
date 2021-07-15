import { BlitzApiHandler } from "blitz"
import ServerPusher from "pusher"

export const serverPusher = new ServerPusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
})

const handler: BlitzApiHandler = async (req, res) => {
  const { channelName, eventName, data } = JSON.parse(req.body)

  await serverPusher.trigger(channelName, eventName, data)
  res.statusCode = 200
  res.end()
}

export default handler
