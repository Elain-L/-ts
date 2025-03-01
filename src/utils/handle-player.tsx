import hyRequest from "@/service"
import { useEffect, useState } from "react"
//获取地址
async function getSongPlay(id: number): Promise<string> {
  const res = await hyRequest.get<any>({
    url: "/song/url",
    params: {
      id
    }
  })
  return res.data[0].url
}
export function useGetSongPlayUrl(id: number): string {
  const [songUrl, setSongUrl] = useState("")
  useEffect(() => {
    getSongPlay(id).then((value) => {
      setSongUrl(value)
    })
  }, [id, songUrl])

  return songUrl
}
