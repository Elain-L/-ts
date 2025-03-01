import React, { memo, Suspense } from "react"
import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "@/views/discover/c-cpns/discover-nav/index"

interface IProps {
  children?: ReactNode
}
const Discover: React.FC<IProps> = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback="">
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

export default memo(Discover)
