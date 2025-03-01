import { memo } from "react"
import type { FC, ReactNode } from "react"
import { RankingItemWrapper } from "./styled"
import { getImgSize } from "@/utils/formath"
import { Link } from "react-router-dom"
interface IProps {
  children?: ReactNode
  itemData: any
}
const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  //榜单的列表
  const { tracks = [] } = itemData
  return (
    <RankingItemWrapper>
      {/* 头部 */}
      <div className="header">
        <div className="image">
          <img src={getImgSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      {/* 列表 */}
      <div className="list">
        {tracks.slice(0, 10).map((item, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  <button className="btn play sprite_02 "></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn favor sprite_02 "></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* 查看全部 */}
      {/* 传入的时候，传入对应id，然后在ranknig页面做处理 */}
      <div className="footer">
        <Link to="/discover/ranking"> 查看全部{">"}</Link>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
