import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getSongDetail, getSongLyric } from "../service/player"
import { ILyric, paraseLyric } from "@/utils/parase-lyric"
import { IRootState } from "@/store"

interface IThukState {
  state: IRootState
}

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThukState
>("currentsong", (id: number, { dispatch, getState }) => {
  //在获取歌曲的时候，判断，当前歌曲列表是否有这个歌
  const playSongnList = getState().player.playSongList
  const findIndex = playSongnList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    //没有找到这个歌，存放这首歌
    //获取歌曲
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const songs = res.songs[0]
      //console.log("songs", songs)
      dispatch(changeCurrentSongAction(songs))
      //然后把这个歌，放到播放列表里面
      const newPlaySongList = [...playSongnList]
      newPlaySongList.push(songs)
      dispatch(changePlaySongListAction(newPlaySongList))
      //存放到最后一个，下标也得变
      dispatch(changePlaySongIndex(newPlaySongList.length - 1))
    })
  } else {
    //有这首歌
    //找到的下标，把这个下标存放进来。
    const song = playSongnList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndex(findIndex))
  }

  //获得歌词
  getSongLyric(id).then((res) => {
    const lyricString = res.lrc.lyric
    //console.log(lyricString, "lyricString")
    //歌词的解析
    const lyrics = paraseLyric(lyricString)
    //console.log(lyrics)
    dispatch(changeLyricsAction(lyrics))
  })
})
//处理切歌的逻辑
export const ferchMusicAction = createAsyncThunk<void, boolean, IThukState>(
  "changeMusic",
  (isNext: boolean, { dispatch, getState }) => {
    //获得player的数据
    const player = getState().player
    const playMode = player.palyMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList

    //根据播放模式来判断如何操作
    let newIndex = songIndex
    if (playMode === 1) {
      //处理随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      //单曲或者顺序
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex >= songList.length) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }
    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndex(newIndex))

    //获得歌词
    getSongLyric(song.id).then((res) => {
      const lyricString = res.lrc.lyric
      //console.log(lyricString, "lyricString")
      //歌词的解析
      const lyrics = paraseLyric(lyricString)
      //console.log(lyrics)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)
interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  palyMode: 0 | 1 | 2
}

const initialState: IPlayerState = {
  // currentSong: {}
  currentSong: {
    name: "温柔",
    id: 386538,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 13193,
        name: "五月天",
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: "600902000000534560",
    fee: 8,
    v: 76,
    crbt: null,
    cf: "",
    al: {
      id: 38285,
      name: "我们是五月天",
      picUrl:
        "https://p2.music.126.net/v4V40sXKnaqsG0ACyY0aDg==/109951164912221924.jpg",
      tns: [],
      pic_str: "109951164912221924",
      pic: 109951164912221920
    },
    dt: 269800,
    h: {
      br: 320000,
      fid: 0,
      size: 10794885,
      vd: -63963,
      sr: 44100
    },
    m: {
      br: 192000,
      fid: 0,
      size: 6476948,
      vd: -61380,
      sr: 44100
    },
    l: {
      br: 128000,
      fid: 0,
      size: 4317980,
      vd: -59700,
      sr: 44100
    },
    sq: {
      br: 1053723,
      fid: 0,
      size: 35536822,
      vd: -63997,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: "1",
    no: 2,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 8704,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 76,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    single: 0,
    noCopyrightRcmd: null,
    rurl: null,
    rtype: 0,
    mst: 9,
    cp: 684010,
    mv: 10929721,
    publishTime: 1049126400000
  },
  //存放当前歌的歌词
  lyrics: [],
  //默认-1，还没有开始取里面的歌词
  lyricIndex: -1,
  //存放播放列表
  playSongList: [
    {
      name: "温柔",
      id: 386538,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 13193,
          name: "五月天",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "600902000000534560",
      fee: 8,
      v: 76,
      crbt: null,
      cf: "",
      al: {
        id: 38285,
        name: "我们是五月天",
        picUrl:
          "https://p2.music.126.net/v4V40sXKnaqsG0ACyY0aDg==/109951164912221924.jpg",
        tns: [],
        pic_str: "109951164912221924",
        pic: 109951164912221920
      },
      dt: 269800,
      h: {
        br: 320000,
        fid: 0,
        size: 10794885,
        vd: -63963,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6476948,
        vd: -61380,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4317980,
        vd: -59700,
        sr: 44100
      },
      sq: {
        br: 1053723,
        fid: 0,
        size: 35536822,
        vd: -63997,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: "1",
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8704,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 76,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rurl: null,
      rtype: 0,
      mst: 9,
      cp: 684010,
      mv: 10929721,
      publishTime: 1049126400000
    },
    {
      name: "起风了",
      id: 1330348068,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12085562,
          name: "买辣椒也用券",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "",
      fee: 8,
      v: 42,
      crbt: null,
      cf: "",
      al: {
        id: 74715426,
        name: "起风了",
        picUrl:
          "https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg",
        tns: [],
        pic_str: "109951163699673355",
        pic: 109951163699673360
      },
      dt: 325868,
      h: {
        br: 320000,
        fid: 0,
        size: 13037236,
        vd: -77525,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7822359,
        vd: -74987,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 5214920,
        vd: -73504,
        sr: 44100
      },
      sq: {
        br: 985873,
        fid: 0,
        size: 40158105,
        vd: -77524,
        sr: 44100
      },
      hr: {
        br: 2832349,
        fid: 0,
        size: 115371553,
        vd: -77475,
        sr: 88200
      },
      a: null,
      cd: "1",
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 42,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 10782615,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 1415923,
      publishTime: 0
    }
  ],
  //列表中当前播放的歌曲下标
  playSongIndex: -1,
  //列表播放模式
  palyMode: 0 //0为顺序，1为随机，2为单曲
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeCurrentSongAction: (state, { payload }) => {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexActionn(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlaySongIndex(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.palyMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexActionn,
  changePlaySongListAction,
  changePlaySongIndex,
  changePlayModeAction
} = playerSlice.actions

export default playerSlice.reducer
