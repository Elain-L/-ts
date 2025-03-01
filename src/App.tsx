import { useRoutes } from "react-router-dom"
import routes from "./router"
import { Suspense, useEffect } from "react"
import AppHeader from "./components/app-header"
import AppFooter from "./components/app-footer"
import AppPlayBar from "./views/player/app-play-bar"
import { useAppDispatch } from "./store"
import { fetchCurrentSongAction } from "./views/player/store/player"

function App() {
  //获取某一首歌
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(1439354270))
  }, [dispatch])
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <Suspense fallback="">{useRoutes(routes)}</Suspense>
      <AppFooter></AppFooter>
      {/* 下面的播放器 */}
      <AppPlayBar></AppPlayBar>
    </div>
  )
}

export default App
