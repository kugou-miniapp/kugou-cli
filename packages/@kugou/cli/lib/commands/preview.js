const path = require('path')
const fs = require('fs')
const QRcode = require('qrcode')
const { exit, done, error, getScanUrl } = require('@kugou-miniapp/cli-shared-utils')
const { checkVersion } = require('../util/check')

exports.command = 'preview <version>'
exports.desc = '预览特定版本的小程序'

exports.handler = async function (argv) {
  const { version } = argv

  if (!checkVersion(version)) {
    error('预览版本格式错误！应符合x.y.z格式！')
    exit()
  }

  const appJSONPath = path.resolve('public/app.json')

  if (!fs.existsSync(appJSONPath)) {
    error('app.json不存在！')
    exit()
  }

  const { appid } = require(appJSONPath)

  if (!appid) {
    error('app.json未配置appid！')
    exit()
  }

  const qrcodeUrl = getScanUrl({ appid, version })

  done('请扫描下面二维码预览小程序！')

  const url = await QRcode.toString(qrcodeUrl, {
    type: 'terminal',
    errorCorrectionLevel: 'L',
  })

  console.log(url)
}
