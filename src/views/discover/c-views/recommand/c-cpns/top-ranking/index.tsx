import { memo } from "react"
import type { FC, ReactNode } from "react"
import { RankingWrapper } from "./styled"
import AreaHeaderV1 from "@/components/area-header-v1"
import { useAppSelecotor } from "@/store"
import TopRankingItem from "../top-ranking item"
import { shallowEqual } from "react-redux"
interface IProps {
  children?: ReactNode
}
const TopRanking: FC<IProps> = () => {
  const { ranking = [] } = useAppSelecotor(
    (state) => ({
      ranking: state.recommand.ranking
    }),
    shallowEqual
  )
  //console.log("ranking", ranking)
  return (
    <RankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking"></AreaHeaderV1>
      <div className="content-Rank">
        {ranking.map((item, key) => {
          return (
            <TopRankingItem key={key + "1"} itemData={item}></TopRankingItem>
          )
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
