export interface ILyric {
  time: number
  text: string
}

//正则匹配,每句歌词的时间
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function paraseLyric(lyricString: string) {
  //拿到一行的歌词（每行由/分割）
  const lines: string[] = lyricString.split("\n")
  const lyrics: ILyric[] = []
  //每句歌词做抽取

  for (const line of lines) {
    const res = timeRegExp.exec(line)
    //console.log(res)
    if (!res) continue
    //获得每一句的总时间[03:49.990]
    const t1 = Number(res[1]) * 60 * 1000
    const t2 = Number(res[2]) * 1000
    const t3 = res[3].length === 2 ? Number(res[3]) * 10 : Number(res[3])
    const time = t1 + t2 + t3
    //console.log("totolTime", time)
    //获得删去[03:49.990]形式的纯文本
    const text = line.replace(timeRegExp, "")
    lyrics.push({ time, text })
  }
  return lyrics
}
