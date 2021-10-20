const fs = require('fs')
const path = require('path')

const { promises } = fs

const Cache = {}

function HtmlFallbackPlugin(entries = {}) {
  return {
    name: 'html-fallback',
    transformIndexHtml(html, ...args) {
      const key = path.basename(args[0].path).split('.')[0]

      if (!Cache[key]) {
        const entry = entries[key]

        if (entry.root !== 'index') {
          html = html.replace('<head>', '<head>\n<base href="../">')
        }

        return html
      }

      Cache[key] = true

      return html
    },
    async writeBundle(options, bundle) {
      const root = options.dir

      for (const name in bundle) {
        if (bundle[name].type === 'asset' && /.*html/.test(name) && name !== 'index.html') {
          const entryName = path.basename(name).split('.')[0]
          const srcPath = path.resolve(root, name)
          const destPath = (entries[entryName] && entries[entryName].root !== 'index') ? path.resolve(root, entries[entryName].root, path.basename(name)) : path.resolve(root, path.basename(name))
          await promises.copyFile(srcPath, destPath)
          await promises.unlink(srcPath)
        }
      }
    }
  }
}

module.exports = HtmlFallbackPlugin