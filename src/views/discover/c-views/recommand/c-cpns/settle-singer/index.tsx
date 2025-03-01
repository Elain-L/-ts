import AreaHeaderV2 from "@/components/area-header-v2"
import { useAppSelecotor } from "@/store"
import { getImgSize } from "@/utils/formath"
import { memo } from "react"
import type { FC, ReactNode } from "react"
import { shallowEqual } from "react-redux"
import { SingerWrapper } from "./styled"
interface IProps {
  children?: ReactNode
}
const SettelSinger: FC<IProps> = () => {
  const { settleSingers } = useAppSelecotor(
    (state) => ({
      settleSingers: state.recommand.settleSinger
    }),
    shallowEqual
  )
  //console.log(settleSingers,)
  return (
    <SingerWrapper>
      <AreaHeaderV2
        tittle="入驻歌手"
        moreText="查看更多"
        moreLink="#/discover/artist"
      ></AreaHeaderV2>
      <div className="artists">
        {settleSingers.map((item) => {
          return (
            <a href="#/discover/artist" key={item.id} className="item">
              <img src={getImgSize(item.picUrl, 62)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia"> {item.alias.join(" ")}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="https://music.163.com/st/musician">申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettelSinger)
