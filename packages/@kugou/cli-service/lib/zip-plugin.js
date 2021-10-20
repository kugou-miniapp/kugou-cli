const fs = require("fs");
const AdminZip = require("adm-zip");
const is = require('@sindresorhus/is');
const { finder, humanFileSize } = require('./utils')
const { statSync } = fs;
const {
  done,
  error,
  info,
} = require("@kugou-miniapp/cli-shared-utils");
const { resolveAppJSON, resolvePageMap } = require("./webpack");
const path = require("path");

class MiniAppZipWebpackPlugin{
  constructor(config = {}) {
    this.config = config;
    const pageMap = resolvePageMap('')
    this.appInfo = resolveAppJSON('', pageMap)
    this.buildPath = this.config.buildPath || path.resolve('dist')
    this.outputPath = this.config.outputPath || path.resolve('release')
    this.exclue = is.regExp(this.config.exclude) ? this.config.exclude : /\.map$/
  }
  apply(compiler) {
    compiler.hooks.done.tap('done', async () => {
      this.run()
    });
    compiler.hooks.failed.tap('failed', (err) => {
      console.log(err);
    });
  }

  async run() {
    const packages = await Promise.all([this.appInfo.rootPackage, ...this.appInfo.subPackages].map(_ => this.generateZip(_.root)))
    // 包体信息
    packages.forEach(p => {
      if (p.size > 5 * 1024 * 1024) {
        error(`${p.name === 'index' ? '主包' : '分包'}${p.name}大小${humanFileSize(p.size)}，大小控制在 5MB以内`);
        return process.exit(1);
      }
      done(`${p.name === 'index' ? '主包' : '分包'}${p.name}：${humanFileSize(p.size)}`)
    })

    done("构建完成 ✅");
    info("请前往酷狗小程序开放平台 https://open.kugou.com/control/basic 手动上传包体");
  }

  generateZip(key) {
    return new Promise(async (resolve, reject) => {
      const zip = new AdminZip()
      const basePath = key === 'index' ? this.buildPath : path.join(this.buildPath, key)
      const zipPath = `${this.outputPath}/${key}.zip`
      const findRes = await finder(basePath)
      // 主包要过滤子包目录
      const directories = key === 'index' ? findRes.directories.filter(_ => {
        const p = this.appInfo.subPackages.find(sp => sp.root === _)
        return !p
      }) : findRes.directories

      findRes.files.filter(_ => !this.exclue.test(_)).forEach(file => zip.addLocalFile(path.join(basePath, file)))
      directories.forEach(dir => zip.addLocalFolder(path.join(basePath, dir), dir))

      zip.writeZip(zipPath, (err) => {
        if (err) return reject(err)
        const info = {
          name: key,
          size: statSync(zipPath).size
        }

        return resolve(info)
      })
    })
  }
}

const MiniAppZipVitePlugin = (options = {}) => ({
  name: 'zip',
  enforce: 'post',
  closeBundle() {
    return new Promise(async (resolve) => {
      const zipPlugin = new MiniAppZipWebpackPlugin(options)
      await zipPlugin.run()
      resolve()
    })
  }
})

exports.MiniAppZipWebpackPlugin = MiniAppZipWebpackPlugin;
exports.MiniAppZipVitePlugin = MiniAppZipVitePlugin
