const fs = require('fs').promises
const { join } = require('path')

/**
 * 把文件大小转为人类可读的格式
 */
function humanFileSize(bytes) {
  const thresh = 1000 // 换算单位采用 SI 标准，系数是 1000 不是 1024
  if (Math.abs(bytes) < thresh) return bytes + ' B'
  const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  const r = 10 ** 1

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

  return bytes.toFixed(1) + ' ' + units[u]
}

/**
 * 列举目标路径下的文件和文件夹
 *
 * @param path
 * @returns {Promise<{files: Array, directories: Array}>}
 */
const finder = async path => {
  const files = []
  const directories = []
  for (const file of await fs.readdir(path)) {
    const fullPath = join(path, file)
    const stat = await fs.stat(fullPath)
    if (stat.isFile()) {
      files.push(file)
      continue
    }
    directories.push(file)
  }
  return { files, directories }
}

module.exports = {
  humanFileSize,
  finder,
}
