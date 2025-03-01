import styled from "styled-components"
import progress_bar from "@/assets/img/progress_bar.png"
import sprite_icon from "@/assets/img/sprite_icon.png"
import pip_icon from "@/assets/img/pip_icon.png"
export const PlayBarWrapper = styled.div`
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  background-position: 0 0;
  background-repeat: repeat;
  .playbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 47px;
  }
`
//告诉control组件有传参
interface IBarcontrol {
  $isPlaying: boolean
}
//本质是函数调用
export const BarControl = styled.div<IBarcontrol>`
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }

  .prev,
  .next {
    width: 28px;
    height: 28px;
  }

  .prev {
    background-position: 0 -130px;
  }

  .play {
    width: 36px;
    height: 36px;
    margin: 0 8px;
    background-position: 0
      ${(props) => (props.$isPlaying ? "-165px" : "-204px")};
  }

  .next {
    background-position: -80px -130px;
  }
`

export const BarPlayerInfo = styled.div`
  display: flex;
  width: 642px;
  align-items: center;

  .image {
    width: 34px;
    height: 34px;
    border-radius: 5px;
  }

  .info {
    flex: 1;
    color: #a1a1a1;
    margin-left: 10px;

    .song {
      color: #e1e1e1;
      position: relative;
      top: 8px;
      left: 8px;

      .singer-name {
        color: #a1a1a1;
        margin-left: 10px;
      }
    }

    .progress {
      display: flex;
      align-items: center;

      .ant-slider {
        position: relative;
        top: -3px;
        width: 493px;
        margin-right: 10px;

        .ant-slider-rail {
          height: 9px;
          background: url(${progress_bar}) right 0;
        }

        .ant-slider-track {
          height: 9px;
          background: url(${progress_bar}) left -66px;
        }

        .ant-slider-handle {
          width: 22px;
          height: 24px;
          border: none;
          margin-top: -7px;
          background: url(${sprite_icon}) 0 -250px;
          &::after {
            display: none;
          }
        }
      }

      .time {
        .current {
          color: #e1e1e1;
        }
        .divider {
          margin: 0 3px;
        }
      }
    }
  }
`

interface IBarOperator {
  $playMode: 0 | 1 | 2
}

export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${pip_icon});
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.$playMode) {
          case 1:
            return "-66px -248px"
          case 2:
            return "-66px -344px"
          default:
            return "-3px -344px"
        }
      }};
      cursor: pointer;
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
      cursor: pointer;
    }
  }
`

export const SongListWrapper = styled.div`
  z-index: 9;
  position: absolute;
  background-color: #333;
  top: -294px;
  color: #ccc;
  left: 50%;
  & div p span {
    box-sizing: border-box;
  }
  .songList-msk {
    position: absolute;
    top: -100px;
    right: -300px;
    width: 300px;
    height: 500px;
    //background-color: red;
  }
  transform: translateX(-${976 / 2}px);
  .list-header {
    display: flex;
    width: 976px;
    height: 40px;
    border-right: 1px solid rgb(128, 119, 119);
    background-color: rgb(16, 15, 15);
    .list-header-left {
      width: 544px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-right: 1px solid rgb(128, 119, 119);
    }
    .list-header-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 420px;
      height: 40px;
      padding-right: 10px;
    }
  }
  .list-main {
    display: flex;
    .list-left {
      width: 553px;
      height: 260px;
      border-left: 1px solid rgb(128, 119, 119);
      border-right: 1px solid rgb(128, 119, 119);
      .noSong {
        height: 43px;
        padding-top: 85px;
        text-align: center;
        line-height: 43px;
      }
      .slist-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 28px;
        line-height: 28px;
        color: #ccc;
        .sItem-left {
          display: flex;
          justify-content: space-between;
          flex: 7;
          padding-right: 50px;
          .sItem-lIcon {
            visibility: hidden;
          }
          .lIcon-active {
            visibility: visible;
          }
        }
        .sItem-right {
          display: flex;
          justify-content: space-between;
          flex: 3;
          padding-right: 10px;
        }
        &:hover {
          cursor: pointer;
          background-color: rgb(25, 24, 24);
        }
      }
      .slist-item:first-child {
        margin-top: 3px;
      }
      .active {
        cursor: pointer;
        background-color: rgb(25, 24, 24);
      }
    }
    .list-right {
      width: 420px;
      height: 250px;
      .show-lyric {
        position: relative;
        height: 100%;
        //overflow: auto;
        overflow: hidden;
        .lyric-item {
          text-align: center;
          margin: 20px 0;
          font-size: 12px;
        }
        & .active {
          font-size: 15px;
          color: #fff;
        }
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }
    }
  }
`
