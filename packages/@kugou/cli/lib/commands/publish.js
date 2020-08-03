const fs = require('fs')
const path = require('path')
const { info, done, exit, error, clearConsole, logWithSpinner, stopSpinner } = require('@kugou-miniapp/cli-shared-utils')
const PackageManager = require('../util/package-manager')
const { uploadPackage } = require('../util/request')
const { checkVersion } = require("../util/check")
const { handler: preview } = require('./preview')
const track = require('../util/track')

exports.command = 'publish [version]'
exports.desc = '发布小程序离线包；version格式x.y.z，默认取最新的版本最后加1'
exports.builder = {
  path: {
    alias: 'p',
    desc: '离线包地址，不填自动当前项目的build命令并上传'
  },
  // sdkVersion: {
  //   alias: 's',
  //   desc: '小程序jssdk的版本，格式x.y.z，默认取最新的版本'
  // },
  description: {
    alias: ['desc', 'd'],
    demand: true,
    desc: '离线包简介，10-32个字符'
  }
}

exports.handler = async function (argv) {
  let {
    version,
    sdkVersion,
    packagePath,
    description
  } = argv
  const params = {}

  // 1. 参数检查
  const appJSONPath = path.resolve('public/app.json')

  if (!fs.existsSync(appJSONPath)) {
    error('当前目录的public文件下未找到app.json文件！')
    exit()
  }

  const { appid, appkey } = require(appJSONPath)

  if (!appid || !appkey) {
    error('app.json未配置appid或appkey！')
    info('请登录开放平台->控制台->配置信息->立即配置页面中进行查看：http://open.kugou.com')
    exit()
  }

  if (version) {
    if (!checkVersion(version)) {
      error('离线包版本格式错误！应符合x.y.z格式！')
      exit()
    } else {
      params.version = version
    }
  }

  if (sdkVersion) {
    // if (!checkVersion(sdkVersion)) {
    //   error('jssdk版本格式错误！应符合x.y.z格式！')
    //   exit()
    // } else {
      params.sdk_version_id = sdkVersion
    // }
  }

  if (description.length < 10 || description.length > 32) {
    error('描述长度不合法，要求10-32个字符以内')
    exit()
  } else {
    params.description = description
  }

  // 2. 获取小程序离线包
  const pm = new PackageManager()

  if (packagePath) {
    if (!fs.existsSync(packagePath)) {
      error('离线包不存在！')
      exit()
    }

    if (!/\.zip$/.test(packagePath)) {
      error('离线包格式要求为zip')
      exit()
    }
  } else {
    info('现在构建小程序，请稍后~')
    await pm.run(['build'])
    packagePath = path.resolve('dist/index.zip')
    info('构建完成！')
  }

  const file = fs.statSync(packagePath)

  if (file.size > 5 * 1024 * 1024) {
    error('离线包过大，要求5m以内')
    exit()
  }

  const fileData = fs.readFileSync(packagePath, { encoding: 'base64' })

  // 3. 上传小程序离线包，获取包加密信息
  clearConsole()
  logWithSpinner('⚓', '上传离线包中，请稍后~')

  try {
    const result = await uploadPackage({
      mp_appid: appid,
      appkey,
      data: fileData,
      ...params
    })

    stopSpinner()
    done('离线包上传成功！')

    track({
      a: 22744,
      ft: 'cli工具发布',
      svar1: appid
    })

    // 5. 显示预览二维码
    preview({ version: result.version })
  } catch(err) {
    const message = err && err.error ? err.error : '离线包上传失败！请稍后重试！'
    error(message)
    exit()
  }
}
