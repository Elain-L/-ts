import HYRequest from "./request"
import { BASE_URL1, TIME_OUT1 } from "./config"
import { InternalAxiosRequestConfig } from "axios"
//import { localCache } from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,
  interceptors: {
    requestInterceptor: (config) => {
      return config as InternalAxiosRequestConfig //这里要求也是要返回InternalAxiosRequestConfig，所以断言一下
    }
  }
})

export default hyRequest
