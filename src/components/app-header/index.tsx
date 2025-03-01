import { memo } from "react"
import type { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { HeaderLeft, HeaderRight, HeaderWrapper } from "./styled"
import headerTitles from "@/assets/data/header_titles.json"
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

interface IProps {
  children?: ReactNode
}
const AppHeader: FC<IProps> = () => {
  //控制离手header，仍然处于选中状态
  //1.使用useState,但是由于默认值，每次刷新就会变化，对应hover效果和路由不匹配
  //2.所以要将active的判断和路由绑定到一起
  //2.1 使用NavLink，在点击的时候自动加上一个active，值也是可以改的
  //2.2 className传入回调函数，也可以自定义样式
  function showItem(item: any) {
    return item.type === "path" ? (
      <NavLink
        // className={(isActive) => (isActive ? "active" : undefined)}
        to={item.link}
      >
        {item.title}
        <i className="icon sprite_01"> </i>
      </NavLink>
    ) : (
      <a href={item.link} target="_blank">
        {item.title}
      </a>
    )
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01">网易云音乐</a>
          <div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input placeholder="default size" prefix={<SearchOutlined />} />
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
