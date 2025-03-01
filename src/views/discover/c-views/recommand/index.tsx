import { memo, useEffect } from "react"
import type { FC, ReactNode } from "react"
import { useAppDispatch } from "@/store"
import TopBanner from "./c-cpns/top-banner"
import { RecommandWrapper } from "./styled"
import HotRecommand from "./c-cpns/hot-recommand"
import NewAlbum from "./c-cpns/new-album"
import { fetchRankingDataAction, fetchRecommandAcion } from "./store"
import TopRanking from "./c-cpns/top-ranking"
import UserLogin from "./c-cpns/user-login"
import SettleSinger from "./c-cpns/settle-singer"
import HotAnchor from "./c-cpns/hot-anchor"
interface IProps {
  children?: ReactNode
}
// interface IBannerType {
//   imageUrl: string
//   targetId: number
//   targetType: number
//   titleColor: string
//   typeTitle: string
//   url: string
//   exclusive: boolean
//   scm: string
//   bannerBizType: string
// }

const Recommand: FC<IProps> = () => {
  const distpatch = useAppDispatch()
  useEffect(() => {
    distpatch(fetchRecommandAcion())
    distpatch(fetchRankingDataAction())
  }, [distpatch])
  return (
    <RecommandWrapper>
      <TopBanner></TopBanner>
      <div className="content wrap-v2">
        {/* 推荐的整个左边区域 */}
        <div className="left">
          <HotRecommand></HotRecommand>
          <NewAlbum></NewAlbum>
          <TopRanking></TopRanking>
        </div>
        {/* 推荐的整个右边区域 */}
        <div className="right">
          <UserLogin></UserLogin>
          <SettleSinger></SettleSinger>
          <HotAnchor></HotAnchor>
        </div>
      </div>
    </RecommandWrapper>
  )
}

export default memo(Recommand)
