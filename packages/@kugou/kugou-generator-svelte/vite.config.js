import path from 'path'
import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'
import legacy from './plugins/legacy'
import htmlFallback from './plugins/html-fallback'
import { getEntries, MiniAppZipVitePlugin } from '@kugou-miniapp/cli-service'

const sveltePreprocess = require('svelte-preprocess')
const resolve = relativePath => path.resolve(__dirname, relativePath);

const rawEntries = getEntries('')
const entries = Object.entries(rawEntries).reduce((pre, [key, value]) => {
  // 过滤index
  if (pre[key]) return pre
  if (value.root === 'index') {
    pre[key] = resolve(`public/${key}.html`)
  } else {
    pre[value.name] = resolve(`public/${value.root}/${key}.html`)
  }
  return pre
}, {
  index: resolve('index.html')
})

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    // sourcemap: true,
    assetsDir: '',
    target: 'es2015',
    rollupOptions: {
      input: entries
    }
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    htmlFallback(rawEntries),
    svelte({
      emitCss: true,
      preprocess: sveltePreprocess({
        aliases: [
          ['@', resolve('src')]
        ],
        scss: {
          prependData: `@import 'src/styles/mixins.scss';`
        }
      })
    }),
    legacy({
      targets: [
        "iOS >= 10"
      ],
      genChunk: false
    }),
    MiniAppZipVitePlugin(),
  ]
})
