const Md5 = require('md5')
const axios = require('axios')

axios.interceptors.request.use((config) => config, error=> Promise.reject(error))
axios.interceptors.response.use((res) => {
  if (res.data) return res.data
  return Promise.reject(res)
}, error => Promise.reject(error))

class Tracker {
  constructor({
    appid = 1000,
    appkey = 'abcdefg'
  } = {}) {
    this.config = {
      appid,
      appkey
    }

    this.init()
  }

  async init() {
    const servertime = await this.getServerTime()

    this.config.servertime = servertime

    this.config.jetTag = servertime - Date.now() / 1000
  }

  // business:
  // bi - 30500
  // apm - 12
  // funnel - 30030
  async track(data, business = 30500) {
    const params = {
      _t: parseInt(Date.now() / 1000) + this.config.jetTag,
      business,
      appid: this.config.appid
    }

    const sign = this.getSign(params, data)

    const res = await axios.post('https://webcollects.kugou.com/v2/web/post', data, {
      ...params,
      sign
    })

    return res
  }

  async getServerTime() {
    const params = {
      _t: Date.now(),
      _r: Math.random(),
      appid: this.config.appid
    }

    const sign = this.getSign(params)

    const { now } = await axios.get('https://webcollects.kugou.com/v2/web/time.js', {
      ...params,
      sign
    })

    return now
  }

  getSign(params, data = {}) {
    var str = "";

    str = Object.keys(params).reduce((pre, val) => {
      return pre + val + params[val]
    }, '')

    const encodeData = url(JSON.stringify(data))

    str += this.config.appkey + encodeData

    return Md5(str)
  }
}

exports.Tracker = Tracker
