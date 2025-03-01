import { memo } from "react"
import type { FC, ReactNode } from "react"
import { FooterWraper } from "./styled"
import { footerLinks } from "@/assets/data/local_data"

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <FooterWraper>
      <ul className="footer-top">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
          return (
            <li className="footer-item" key={item + "654"}>
              <div className="img"></div>
              <div className="desc">音乐开放平台</div>
            </li>
          )
        })}
      </ul>
      <div className="footer-footer">
        <p className="tiaokaun">
          {footerLinks.map((item, index) => {
            return (
              <a href={item.link} className="tItem" key={item.link}>
                <span className="text">{item.title}</span>
                {index === footerLinks.length - 1 || (
                  <span className="divider">|</span>
                )}
              </a>
            )
          })}
        </p>
        <p className="kefu">
          <span>廉正举报</span>
          <span>不良信息举报邮箱: 51jubao@service.netease.com</span>
          <span>客服热线：95163298</span>
        </p>
        <p className="xvckezheng">
          <span> 互联网宗教信息服务许可证：浙（2022）0000120</span>
          <span> 增值电信业务经营许可证：浙B2-20150198 粤B2-20090191-18</span>
          <a href="https://beian.miit.gov.cn/">
            工业和信息化部备案管理系统网站
          </a>
        </p>
        <p className="banquan">
          网易公司版权所有©1997-2025杭州乐读科技有限公司运营：浙网文[2024]
          0900-042号 浙公网安备 33010802013307号 算法服务公示信息
        </p>
      </div>
      <div style={{ height: "65px" }}></div>
    </FooterWraper>
  )
}

export default memo(AppFooter)
