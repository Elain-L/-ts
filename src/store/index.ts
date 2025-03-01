import { configureStore } from "@reduxjs/toolkit"
import {
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual
} from "react-redux"
import demoReducer from "./modules/demo"
import recommandSlice from "@/views/discover/c-views/recommand/store/index"
import playerSlice from "@/views/player/store/player"
const store = configureStore({
  reducer: {
    demo: demoReducer,
    recommand: recommandSlice,
    player: playerSlice
  }
})

type GetStateFnType = typeof store.getState
type FnReturnType = ReturnType<GetStateFnType>
export type IRootState = FnReturnType
type DispatchType = typeof store.dispatch

export const useAppSelecotor: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const appShallowEqual = shallowEqual
export default store
