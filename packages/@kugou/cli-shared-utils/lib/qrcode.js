const fs = require('fs')
const path = require('path')

const QRcode = require('qrcode')

const { info, done, error } = require('./logger')

const stringify = obj => Object.keys(obj).reduce((pre, key) => {
  pre += (pre === '' ? '' : '&') + `${key}=${obj[key]}`

  return pre
}, '')

function getScanUrl({
  appid,
  url,
  version
}) {
  const options = {
    op: 'KugouMiniAppDebug',
    AppID: appid
  }

  if (url) {
    options.preview = 2
    options.url = encodeURIComponent(url)
  } else {
    options.preview = 1
    options.preview_ver = version
  }

  return `kugouscan://${stringify(options)}`
}

exports.getScanUrl = getScanUrl

exports.generatePreviewQrcode = async (url, message = '扫描下面二维码，可以本地调试小程序！') => {
  const appJSONPath = path.resolve('public/app.json')

  if (!fs.existsSync(appJSONPath)) {
    error('app.json不存在，请检查目录！')
    return
  }

  const appid = require(appJSONPath).appid

  if (!appid) {
    info('请在app.json配置appid获得更好的开发体验！')
    info('请在开放平台(http://open.kugou.com/) -> 控制台 -> 开发管理 -> 点击页面配置获取appid')
    return
  }

  message && done(message)

  const qrcodeUrl = getScanUrl({ appid, url })

  const qrcodeString = await QRcode.toString(qrcodeUrl, {
    type: 'terminal',
    errorCorrectionLevel: 'L'
  })

  console.log(qrcodeString)
}


