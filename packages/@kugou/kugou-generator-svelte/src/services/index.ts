
import axios from 'axios'
import MiniappAdapter from './miniapp-adapter'
// import { get } from 'svelte/store'
// import { stores } from '@/store'
import { isKugouMiniApp } from '@/utils/const'

const axiosInstance = axios.create()

if (isKugouMiniApp) {
  axiosInstance.defaults.adapter = MiniappAdapter
}
axiosInstance.defaults.baseURL = 'https://tide-dapi.moreless.io'
axiosInstance.defaults.timeout = 20000
axiosInstance.defaults.headers = {
  "Content-Type": "application/json"
}

axiosInstance.interceptors.request.use((config) => {
  // const user = get(stores.user)

  config.params = config.params || {}

  return config
}, err => {
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use((res) => {
  // if (res.data.status === 0) return Promise.reject(res.data)

  // const data = (res.data && Reflect.has(res.data, 'data')) ? res.data.data : res.data
  return Promise.resolve(res.data)
}, err => {
  return Promise.reject(err)
})

export default axiosInstance
