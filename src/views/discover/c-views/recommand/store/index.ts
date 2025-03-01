import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getArtistList,
  getBanners,
  getHotRecommed,
  getNewAlbum,
  getPlayListDetail
} from "../service/recommand"

export const fetchRecommandAcion = createAsyncThunk(
  "fetchData",
  (payload, { dispatch }) => {
    getBanners().then((res) => {
      dispatch(changeBannerState(res.banners))
    })
    getHotRecommed(8).then((res) => {
      dispatch(changeHotRecommendAction(res.result))
    })
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumAction(res.albums))
    })
    getArtistList(5).then((res) => {
      //console.log(res)
      dispatch(changeSettleSingerAction(res.artists))
    })
  }
)
const rankingId = [19723756, 3779629, 2884035]

export const fetchRankingDataAction = createAsyncThunk(
  "ranking",
  (payload, { dispatch }) => {
    //获取榜单的三个数据,，一起拿到统一处理
    const promiseRanking: Promise<any>[] = []
    for (const id of rankingId) {
      promiseRanking.push(getPlayListDetail(id))
    }
    Promise.all(promiseRanking).then((res) => {
      //只要里面的playlist数组
      const playList = res.map((item) => item.playlist)

      dispatch(changeRankingAction(playList))
    })
  }
)
interface IRecommandState {
  banners: any[]
  hotRecommend: any[]
  newAlum: any[]
  ranking: any[]
  settleSinger: any[]
}

const initialState: IRecommandState = {
  banners: [],
  hotRecommend: [],
  newAlum: [],
  ranking: [],
  settleSinger: []
}

const recommandSlice = createSlice({
  name: "recommand",
  initialState,
  reducers: {
    changeBannerState: (state, { payload }) => {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommend = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlum = payload
    },
    changeRankingAction(state, { payload }) {
      state.ranking = payload
    },
    changeSettleSingerAction(state, { payload }) {
      state.settleSinger = payload
    }
  }
  // extraReducers(builder) {
  //   return builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log("pending")
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log("rejected")
  //     })
  // }
})
export const {
  changeBannerState,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankingAction,
  changeSettleSingerAction
} = recommandSlice.actions
export default recommandSlice.reducer
