import hyRequest from "@/service"

export function getBanners() {
  return hyRequest.get({
    url: "/banner"
  })
}
export function getHotRecommed(limit = 30) {
  return hyRequest.get({
    url: "/personalized",
    params: {
      limit
    }
  })
}

export function getNewAlbum(limit = 10) {
  return hyRequest.get({
    url: "/album/newest",
    params: {
      limit
    }
  })
}

export function getPlayListDetail(id: number) {
  return hyRequest.get({
    url: "/playlist/detail",
    params: {
      id
    }
  })
}

export function getArtistList(limit = 5) {
  return hyRequest.get({
    url: "/artist/list",
    params: {
      limit
    }
  })
}
