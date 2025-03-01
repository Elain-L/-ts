import { memo } from "react"
import type { FC, ReactNode } from "react"
import { HeaderV2Wrapper } from "./styled"
interface IProps {
  children?: ReactNode
  tittle: string
  moreText?: string
  moreLink?: string
}
const AreaHeaderV2: FC<IProps> = (props) => {
  const { tittle = "标题", moreLink, moreText } = props
  return (
    <HeaderV2Wrapper>
      <h3>{tittle}</h3>
      {moreLink && moreText && (
        <a href={moreLink}>
          {moreText}
          {">"}
        </a>
      )}
    </HeaderV2Wrapper>
  )
}

export default memo(AreaHeaderV2)
