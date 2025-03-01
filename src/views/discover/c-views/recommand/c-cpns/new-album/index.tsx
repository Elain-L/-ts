import { memo, useRef } from "react"
import type { ElementRef, FC, ReactNode } from "react"
import { AlbuumWrapper } from "./styled"
import AreaHeaderV1 from "@/components/area-header-v1"
import { Carousel } from "antd"
import { useAppSelecotor } from "@/store"
import NewAlbumItem from "@/components/new-album-item"
import { shallowEqual } from "react-redux"
interface IProps {
  children?: ReactNode
}
const NewAlbum: FC<IProps> = () => {
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const { newAlbums } = useAppSelecotor(
    (state) => ({
      newAlbums: state.recommand.newAlum
    }),
    shallowEqual
  )

  //函数的控制
  function handlePreClick() {
    carouselRef.current?.prev()
  }
  function handleNextClick() {
    carouselRef.current?.next()
  }
  return (
    <AlbuumWrapper className=".wrap-v2">
      {" "}
      <AreaHeaderV1
        title="新碟上架"
        moreLink="/discover/album"
      ></AreaHeaderV1>{" "}
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          {/* 里面的轮播图 */}
          <Carousel autoplay ref={carouselRef} dots={false} speed={1000}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {/* 0*5到 （0+1）*5 */}
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      return (
                        <NewAlbumItem
                          itemData={album}
                          key={album.id}
                        ></NewAlbumItem>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbuumWrapper>
  )
}

export default memo(NewAlbum)
