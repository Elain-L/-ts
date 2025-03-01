import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { lazy } from "react"

const Discover = lazy(() => import("@/views/discover"))
const Mine = lazy(() => import("@/views/mine"))
const Focus = lazy(() => import("@/views/focus"))
const Download = lazy(() => import("@/views/download"))

const Recommand = lazy(() => import("@/views/discover/c-views/recommand"))
const Ranking = lazy(() => import("@/views/discover/c-views/ranking"))
const Songs = lazy(() => import("@/views/discover/c-views/songs"))
const Djradio = lazy(() => import("@/views/discover/c-views/djradio"))
const Artist = lazy(() => import("@/views/discover/c-views/artist"))
const Album = lazy(() => import("@/views/discover/c-views/album"))

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/discover"></Navigate>
  },
  {
    path: "/discover",
    element: <Discover></Discover>,
    children: [
      {
        path: "/discover",
        element: <Navigate to="/discover/recommend"></Navigate>
      },
      {
        path: "/discover/recommend",
        element: <Recommand></Recommand>
      },
      {
        path: "/discover/ranking",
        element: <Ranking></Ranking>
      },
      {
        path: "/discover/songs",
        element: <Songs></Songs>
      },
      {
        path: "/discover/djradio",
        element: <Djradio></Djradio>
      },
      {
        path: "/discover/album",
        element: <Album></Album>
      },
      {
        path: "/discover/artist",
        element: <Artist></Artist>
      }
    ]
  },
  {
    path: "/mine",
    element: <Mine />
  },
  {
    path: "/focus",
    element: <Focus />
  },
  {
    path: "/download",
    element: <Download />
  }
]

export default routes
