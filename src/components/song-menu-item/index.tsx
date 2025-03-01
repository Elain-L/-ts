import { memo } from "react"
import type { FC, ReactNode } from "react"
import { MenuItemWrapper } from "./styled"
import { formatCount, getImgSize } from "@/utils/formath"
interface IProps {
  children?: ReactNode
  itemData: any
}
const SongMenuItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <MenuItemWrapper>
      <div className="top ">
        <img src={getImgSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite-cover">
          <div className="info sprite-cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </MenuItemWrapper>
  )
}

export default memo(SongMenuItem)
