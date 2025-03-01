import { memo, useRef, useState } from "react"
import type { FC, ReactNode, ElementRef } from "react"
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from "./styled"
import { useAppSelecotor } from "@/store"
import { shallowEqual } from "react-redux"
import { Carousel } from "antd"
import classNames from "classnames"

interface IProps {
  children?: ReactNode
}
const TopBanner: FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  const [currentNum, setCurrentNum] = useState(0)
  let isShuXin = 0
  const { banners } = useAppSelecotor(
    (state) => ({
      banners: state.recommand.banners
    }),
    shallowEqual
  )
  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }
  function afterChange(currentNum: number) {
    setCurrentNum(currentNum)
  }
  function beforeChange() {
    if (isShuXin !== 0) {
      setCurrentNum(-1)
    }
    isShuXin = 1
  }
  //获取图片地址
  let imgUrl
  if (currentNum >= 0 && banners.length > 0) {
    imgUrl = banners[currentNum]?.imageUrl
    imgUrl = imgUrl + "?imageView&blur=40x20"
  }
  return (
    <BannerWrapper
      style={{ background: `url(${imgUrl}) center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay
            ref={bannerRef}
            effect="fade"
            afterChange={afterChange}
            dots={false}
            beforeChange={beforeChange}
          >
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <div className="dots">
            {banners.map((item, index) => {
              return (
                <li
                  key={item.imageUrl}
                  className={classNames("item", {
                    active: index === currentNum
                  })}
                ></li>
              )
            })}
          </div>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
