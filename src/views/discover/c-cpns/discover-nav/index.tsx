import { memo } from "react"
import type { FC, ReactNode } from "react"
import { NavBarWrapper } from "./styled"
import { NavLink } from "react-router-dom"

import { discoverMenu } from "@/assets/data/local_data"

interface IProps {
  children?: ReactNode
}
const NavBar: FC<IProps> = () => {
  return (
    <NavBarWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavBarWrapper>
  )
}

export default memo(NavBar)
