import { memo, useEffect, useRef, useState } from "react"
import type { FC, ReactNode } from "react"
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayBarWrapper,
  SongListWrapper
} from "./styled"
import { Link } from "react-router-dom"
import { message, Slider } from "antd"
import { useAppDispatch, useAppSelecotor } from "@/store"
import { formatTime, getImgSize } from "@/utils/formath"
import { shallowEqual } from "react-redux"
import { useGetSongPlayUrl } from "@/hooks/handle-player"
import {
  changeCurrentSongAction,
  changeLyricIndexActionn,
  changePlayModeAction,
  changePlaySongIndex,
  ferchMusicAction
} from "../store/player"
import {
  CaretRightFilled,
  CloseOutlined,
  DisconnectOutlined,
  SmileOutlined
} from "@ant-design/icons"
import classNames from "classnames"

interface IProps {
  children?: ReactNode
}
const AppPlayerBar: FC<IProps> = () => {
  //从存当前下标
  const dispatch = useAppDispatch()
  //拿到音频元素
  const audioRef = useRef<HTMLAudioElement>(null)
  //拿到列表右侧的滚动区域
  const scrollRef = useRef<HTMLDivElement>(null)
  //拿到滚动的盒子
  const divRef = useRef<HTMLDivElement>(null)
  //获取当前歌曲的对象,歌词，当前下标,歌曲播放模式
  const { currentSong, lyrics, lyricIndex, playMode, songList, playSongIndex } =
    useAppSelecotor(
      (state) => ({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyrics,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.palyMode,
        songList: state.player.playSongList,
        playSongIndex: state.player.playSongIndex
      }),
      shallowEqual
    )
  //拿到视频地址
  const songPlayUrl = useGetSongPlayUrl(currentSong.id)
  //音乐暂停的状态
  const [isPlaying, setPlaying] = useState(false)
  //播放条的状态
  const [progress, setProgress] = useState(0)
  //获取播放的总时长
  const [duration, setDuration] = useState(0)
  //当前的播放时长
  const [currentTime, setCurrentTime] = useState(0)
  //是否第一次进入浏览器
  const [isFirst, setIsFirst] = useState(true)
  //点击隐藏歌曲列表
  const [isShow, setIsshow] = useState(false)
  //添加歌曲地址
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songPlayUrl
      if (isPlaying) audioRef.current.play()
    }
    // audioRef.current?.src = songPlayUrl
    // audioRef?.current.src = getSongPlayUrl(currentSong.id)
    // audioRef.current!.src = getSongPlayUrl(currentSong.id)
    //2.获得总时长
    setDuration(currentSong.dt)
  }, [currentSong, songPlayUrl]) //切换歌，自动执行
  //打开播放列表时，window阻止滚动
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
    }
    if (isShow) {
      window.addEventListener("wheel", handleWheel, { passive: false })
      return () => {
        window.removeEventListener("wheel", handleWheel)
      }
    }
  }, [isShow])
  //点击播放的逻辑
  function handlePlayBtn() {
    setIsFirst(false)

    if (audioRef.current) {
      //在setState里面，先设置后，同步代码拿到的是旧的，所以刚开始逻辑要取反
      if (!isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log(err, "播放错误")
          setPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
      setPlaying(!isPlaying)
    }
  }
  //播放时间的处理，歌词显示
  function handleTimeUpDate() {
    const currentTime = audioRef.current!.currentTime * 1000
    //计算进度
    const progress = (currentTime / duration) * 100
    setProgress(progress)
    setCurrentTime(currentTime)

    //歌词与currentTime歌词的匹配
    let index = lyrics.length - 1
    //遍历数组，开始找到，第一个大于当前时间的，那么这个前一段时间，就是当前时间
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        //直接返回
        break
      }
    }

    //处理-1下标，以及频繁匹配问题
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexActionn(index))
    if (!isFirst && currentTime !== 0 && lyrics[index].text) {
      message.open({
        content: lyrics[index].text,
        key: "lyrics",
        duration: 0
      })
    }
    //确保打开了showList页面
    if (scrollRef.current) {
      //基本逻辑是，首先要明确translateY时，是从头开始运动的，不是接着上面的运动
      //以及移动的一定是，歌词外面的包含的div，而不是overflow的这个div
      //Y算出来的一定是刚开始两者的视口差距，不是他包裹的div等
      //差距为两者之间的距离
      //所以这种方法移动视口时（fixed定位没事），或者移动里面的滚动条（暂时没解决），会有问题
      const parRectHeight = divRef.current!.getBoundingClientRect().top
      console.log("parRectHeight", parRectHeight)
      const chilRectHeight =
        divRef.current!.children[index].getBoundingClientRect().top
      console.log("chilRectHeight", chilRectHeight)
      const Y = parRectHeight - chilRectHeight
      divRef.current!.style.transform = `translateY(${Y + 17 * 3.5}px)`
    }
    // //另一个方法
    // if (
    //   scrollRef.current &&
    //   divRef.current!.children[lyricIndex].clientHeight !== 0
    // ) {
    //   //获得一个歌词的距离
    //   const lyricHeight = divRef.current!.children[lyricIndex].clientHeight
    //   console.log(lyricHeight)
    //   //获得这个距离外层divRef的距离
    //   const ldHeight = lyricHeight * index
    //   //获取scrollRef的距离的一半
    //   const scrollHeight = scrollRef.current.clientHeight / 2
    //   //获得移动的距离
    //   const dist = ldHeight - scrollHeight
    //   divRef.current!.style.transform = `translateY(${-dist}px)`
    // }
  }
  //处理进度条，移动切时间
  function handleOnChange(value) {
    setIsFirst(false)
    // console.log(value)
    //当前点击的时间
    const currentTime = (value / 100) * duration
    //设置当前的播放时间
    audioRef.current!.currentTime = currentTime / 1000
    //设置
    setCurrentTime(currentTime)
    setProgress(value)
  }
  //切换模式的改变
  function handleLoop() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }
  //切歌
  function handleMusic(isnext: boolean = true) {
    setIsFirst(false)
    dispatch(ferchMusicAction(isnext))
  }
  //播放完自动切歌
  function handleMusicEnded() {
    if (playMode === 2) {
      //单曲循环
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    } else {
      //不是，自动切歌
      handleMusic(true)
    }
  }
  return (
    <PlayBarWrapper className="sprite_playbar">
      <div className="playbar-content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtn}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleMusic(true)}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/play">
            {" "}
            <img
              src={getImgSize(currentSong?.al?.picUrl, 34)}
              className="image"
            ></img>
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name} / </span>
              <span className="song-singer">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* 播放条 */}
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleOnChange}
              ></Slider>
              <div className="item">
                <span className="current">
                  {formatTime(currentTime) ? formatTime(currentTime) : "00"}
                </span>
                <span className="divider">/</span>
                <span className="duration">
                  {formatTime(duration) ? formatTime(duration) : "00"}
                </span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator $playMode={playMode}>
          <div className="left">
            <button className="bnt pip"></button>
            <button className="bnt sprite_playbar favor"></button>
            <button className="bnt sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar volume">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleLoop}
            ></button>
            <button
              className="btn sprite_playbar playlist"
              onClick={() => setIsshow(!isShow)}
            >
              {songList?.length}
            </button>
          </div>
        </BarOperator>
      </div>
      <audio
        src=""
        ref={audioRef}
        onTimeUpdate={handleTimeUpDate}
        onEnded={handleMusicEnded}
      ></audio>

      {isShow && (
        <SongListWrapper>
          <div
            className="songList-msk"
            onClick={() => setIsshow(!isShow)}
          ></div>
          <div className="list-header">
            <div className="list-header-left">
              <div
                style={{
                  fontSize: "14px",
                  color: "#e2e2e2",
                  lineHeight: "40px",
                  paddingRight: "5px"
                }}
              >
                播放列表{`(${0})`}
              </div>
              <div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#bfb1b1",
                    lineHeight: "40px",
                    paddingRight: "5px",
                    cursor: "pointer"
                  }}
                >
                  收藏全部
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#bfb1b1",
                    lineHeight: "40px",
                    cursor: "pointer"
                  }}
                >
                  清除
                </span>
              </div>
            </div>
            <div className="list-header-right">
              <span style={{ width: "20px" }}></span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#e2e2e2",
                  lineHeight: "40px",
                  paddingRight: "5px"
                }}
              >
                {currentSong?.name}
              </span>
              <div className="list-icon" onClick={() => setIsshow(!isShow)}>
                <CloseOutlined
                  style={{ fontSize: "12px", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className="list-main">
            <div className="list-left">
              {songList.length === 0 && (
                <div className="noSong">
                  <div>
                    <SmileOutlined style={{ fontSize: "30px" }} />{" "}
                    你还没有添加任何歌曲
                  </div>
                  <div> 去首页发现音乐，或在我的音乐收听自己收藏的歌单。</div>
                </div>
              )}
              {songList.map((item, index) => {
                return (
                  <div
                    className={classNames("slist-item", {
                      active: index === playSongIndex
                    })}
                    key={index}
                    onClick={() => {
                      dispatch(changeCurrentSongAction(item))
                      dispatch(changePlaySongIndex(index))
                    }}
                  >
                    <div className="sItem-left">
                      <span>
                        <span
                          className={classNames("sItem-lIcon", {
                            "lIcon-active": index === playSongIndex
                          })}
                        >
                          <CaretRightFilled style={{ color: "red" }} />
                        </span>

                        <span>{item.name}</span>
                      </span>
                      <span>{item?.ar[0]?.name}</span>
                    </div>
                    <div className="sItem-right">
                      <span>{formatTime(item?.dt)}</span>
                      <DisconnectOutlined />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="list-right">
              <div className="show-lyric" ref={scrollRef}>
                <div ref={divRef}>
                  {lyrics.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={classNames("lyric-item", {
                          active: index === lyricIndex
                        })}
                      >
                        {item.text}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </SongListWrapper>
      )}
    </PlayBarWrapper>
  )
}

export default memo(AppPlayerBar)
