import { memo } from "react"
import type { FC, ReactNode } from "react"
import { HeaderV1Wrapper } from "./styled"
import { Link } from "react-router-dom"
interface IProps {
  children?: ReactNode
  title?: string
  keyWords?: string[]
  moreTesxt?: string
  moreLink?: string
}
const AreaHeaderV1: FC<IProps> = (props) => {
  const {
    title = "默认标题",
    keyWords = [],
    moreTesxt = "更多",
    moreLink = "/"
  } = props

  return (
    <HeaderV1Wrapper className=" sprite_02">
      <div className="left">
        <div className="title">{title}</div>
        <div className="keywords">
          {keyWords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink} className="more">
          {moreTesxt}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(AreaHeaderV1)
