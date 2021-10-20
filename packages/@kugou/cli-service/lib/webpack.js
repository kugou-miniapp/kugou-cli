const fs = require('fs')
const path = require('path')

function getEntries(baseDir = '') {
  const pageMap = resolvePageMap(baseDir);
  const appInfo = resolveAppJSON(baseDir, pageMap);

  const entries = {}
  for (let key in pageMap) {
    const packageInfo = appInfo.getPackageByPage(key)

    if (packageInfo.root === 'index') {
      // 主包
      entries[key] = {
        root: 'index',
        name: key,
        path: pageMap[key].path
      }
    } else {
      // 子包
      const entryName = `${packageInfo.root}/${key}`

      entries[key] = {
        root: packageInfo.root,
        name: entryName,
        path: pageMap[key].path
      }
    }
  }

  return entries
}

function resolvePageMap(baseDir = '') {
  const pageMap = {};
  const dir = path.resolve(baseDir, 'src/entries');
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const extname = path.extname(fullPath);
    const basename = path.basename(file, extname);

    if (/\.(t|j)sx?/.test(extname)) {
      pageMap[basename] = {
        path: fullPath
      }
    }
  });

  return pageMap;
}

// 解析主包和分包信息
function resolveAppJSON(baseDir = '', pageMap) {
  const appJSONPath = path.resolve(baseDir, 'public/app.json');
  const appJSON = require(appJSONPath);
  const pages = (appJSON.pages || []).filter(_ => _.path).map(_ => _.path.split('/').pop().replace('.html', ''))
  const subpackages = appJSON.subpackages || []

  const rootPackage = {
    root: 'index',
    pages: []
  }
  let subPackages = []

  if (subpackages.length === 0) {
    // 若分包配置无效，全部打进主包
    for (let key in pageMap) {
      rootPackage.pages.push(key)
    }
  } else {
    // 获取主包信息，从入口过滤出有效的页面
    const usedPageMap = {} // 已在某个包内使用过的页面，避免重复引用
    const rootPages = pages.filter(_ => pageMap[_])
    rootPackage.pages = rootPages
    rootPages.forEach(_ => usedPageMap[_] = true)
    // 获取分包信息，从入口过滤出有效的页面
    subPackages = subpackages.map(sp => {
      if (!/\w+/.test(sp.root) || sp.root === 'index') return null

      const subPages = sp.pages.filter(p => {
        const hasUsed = Reflect.has(usedPageMap, p)
        const isValid = Reflect.has(pageMap, p)

        if (isValid && !hasUsed) {
          usedPageMap[p] = true
          return true
        }

        return false
      })

      if (subPages.length === 0) return null

      return {
        root: sp.root,
        pages: subPages
      }

    }).filter(_ => _)

    // 没有用到的页面全部算入主包
    for (let key in pageMap) {
      if (usedPageMap[key]) continue

      rootPackage.pages.push(key)
    }
  }

  return {
    rootPackage,
    subPackages,
    isInPacakge(pageName, packageName) {
      if (!pageName || !packageName) return false

      const package = getPackageByPage(pageName)

      return package && package.root === packageName
    },
    getPackageByPage(pageName) {
      if (!pageName) return

      const package = [rootPackage, ...subPackages].find(_ => _.pages.includes(pageName))

      return package
    }
  }
}

exports.getEntries = getEntries
exports.resolvePageMap = resolvePageMap
exports.resolveAppJSON = resolveAppJSON
