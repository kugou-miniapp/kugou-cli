const path = require ('path');
const fs = require ('fs');
const archiver = require('archiver');
const os = require('os');
const is = require('@sindresorhus/is');

const fsReaddir = async (lp) => {
  return new Promise((resolve, reject) => {
    fs.readdir(lp, function (err, files) {
      err && reject(err);
      resolve(files);
    })
  })
};
const fsStat = async (p) => {
  return new Promise((resolve, reject) => {
    fs.stat(p, function (error, stats) {
      error && reject(error);
      resolve(stats);
    })
  })
};
/**
 * 搜索所有目标路径下的文件
 * @param localPath
 * @returns {Promise<{fileHandler: Array, dirHandler: Array}>}
 */
const finderGetter = async (localPath) => {
  let fileHandler = [];
  let dirHandler = [];
  const fileTreeGetter = async (lp = localPath) => {
    let files = await fsReaddir(lp);
    for (let i = 0; i < files.length; i++) {
      let p = path.join(lp, files[i]);
      let stats = await fsStat(p);
      if (stats.isFile()) {
        fileHandler.push(p);
        continue
      }
      dirHandler.push(p);
      await fileTreeGetter(p);
    }
  };
  await fileTreeGetter();
  return {fileHandler, dirHandler}
};
/**
 * 单个打包压缩
 * @param rule
 * @param targetPath 目标路径
 * @param resultPath 输出路径
 * @returns {Promise<void>}
 */
async function zipMiniApp (rule, targetPath, resultPath, exclude) {
  let version = os.platform();
  let isWindow = new RegExp("win","ig").test(version);

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  var output = fs.createWriteStream(path.join(resultPath + `/${rule.name || "dist"}.zip`));
  archive.pipe(output);
  const toAddPath = [];
  const { fileHandler } = await finderGetter(targetPath);
  fileHandler.map(v => {
    if (exclude.test(v)) return

    if(!Reflect.has(rule, 'content') || !Array.isArray(rule.content)) {
      let path = v.split(targetPath);
      let name = path[1];
      toAddPath.push({
        path: v,
        name: name
      })
    } else {
      rule.content.map(x => {
        let twoPieces = x.split("[hash]");
        if(isWindow) {
          twoPieces[0] = twoPieces[0].replace("/","\\");
        }
        let addIn = true;
        let name;
        for (let i = 0; i < twoPieces.length; i++) {
          if (v.indexOf(twoPieces[i]) === -1) addIn = false;
        }

        if (addIn) {
          name = v.split(twoPieces[0])[1].split(twoPieces[1])[0];
        }

        addIn && toAddPath.push({
          path: v,
          name: x.replace("[hash]", name)
        })
      })
    }
  });

  toAddPath.map(v => {
    archive.append(fs.createReadStream(v.path), {name: v.name})
  });
  archive.finalize();
}
/**
 * 压缩
 * @param config 压缩配置
 */
async function toZip (config) {
  const { r, t = "dist", d = "dist", exclude } = config;
  const rules = r || [];

  const REG_EXCLUDE = is.regExp(exclude) ? exclude : /\.map$/

  for (let i = 0; i < rules.length; i++) {
    setTimeout(() => {
      zipMiniApp(rules[i], path.resolve(t), path.resolve(d), REG_EXCLUDE)
    }, i * 1000);
  }
}

class MiniAppZipWebpackPlugin{
  constructor(config) {
    this.config = config;
  }
  apply(compiler) {
    compiler.hooks.done.tap('done', () => {
      toZip(this.config);
    });
    compiler.hooks.failed.tap('failed', (err) => {
      console.log(err);
    });
  }
}

exports.toZip = toZip;
exports.MiniAppZipWebpackPlugin = MiniAppZipWebpackPlugin;
