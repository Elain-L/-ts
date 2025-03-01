//累计人数格式化,数字的约算
export function formatCount(count: number) {
  if (count > 100000) {
    return Math.ceil(count / 10000) + "万"
  } else {
    return 100000
  }
}
//img元素传地址时，根据大小来传
export function getImgSize(
  imgUrl: string,
  width: number,
  height: number = width
) {
  return imgUrl + `?param=${width}x${height}`
}

//转化分秒
export function formatTime(time: number) {
  //毫秒转为喵
  const time_sec = time / 1000
  //转为分钟和喵
  const m = Math.floor(time_sec / 60)
  const s = Math.floor(time_sec) % 60
  //补零
  const forM = String(m).padStart(2, "0")
  const fors = String(s).padStart(2, "0")
  return `${forM}:${fors}`
}
