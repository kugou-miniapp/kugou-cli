const fs = require('fs')
const path = require('path')

const { promises } = fs

function HtmlFallbackPlugin() {
  return {
    name: 'html-fallback',
    async writeBundle(options, bundle) {
      const root = options.dir

      for (const name in bundle) {
        if (bundle[name].type === 'asset' && /.*html/.test(name) && name !== 'index.html') {
          const srcPath = path.resolve(root, name)
          const destPath = path.resolve(root, path.basename(name))
          await promises.copyFile(srcPath, destPath)
          await promises.unlink(srcPath)
        }
      }
    }
  }
}

module.exports = HtmlFallbackPlugin