import { memo } from "react"
import type { FC, ReactNode } from "react"
import { RecommandWrapper } from "./styled"
import AreaHeaderV1 from "@/components/area-header-v1"
import { useAppSelecotor } from "@/store"
import { shallowEqual } from "react-redux"
import SongMenuItem from "@/components/song-menu-item"
interface IProps {
  children?: ReactNode
}
const HotRecommand: FC<IProps> = () => {
  const { hotRecommends } = useAppSelecotor(
    (state) => ({
      hotRecommends: state.recommand.hotRecommend
    }),
    shallowEqual
  )
  return (
    <RecommandWrapper>
      <AreaHeaderV1
        title="热门推荐"
        keyWords={["华语", "流行", "摇滚"]}
        moreLink="/discover/songs"
      ></AreaHeaderV1>

      <div className="recommend-list">
        {hotRecommends?.map((item) => {
          return (
            <SongMenuItem key={item.id} itemData={item}>
              {item.name}
            </SongMenuItem>
          )
        })}
      </div>
    </RecommandWrapper>
  )
}

export default memo(HotRecommand)
