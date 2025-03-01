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
      const songUrl_0 = value.split("?")
      setSongUrl(songUrl_0[0])
      //console.log(songUrl_0)
    })
  }, [id, songUrl])

  return songUrl
}
