import path from 'path'
import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'
import legacy from './plugins/legacy'
import zip from './plugins/zip'
import htmlFallback from './plugins/html-fallback'
import { getEntries } from '@kugou-miniapp/cli-service'

const sveltePreprocess = require('svelte-preprocess')
const resolve = relativePath => path.resolve(__dirname, relativePath);

const entries = Object.keys(getEntries()).reduce((pre, key) => {
  // 过滤index
  if (pre[key]) return pre

  pre[key] = resolve(`public/${key}.html`)
}, {
  index: resolve('index.html')
})

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    // sourcemap: true,
    assetsDir: 'static',
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
    htmlFallback(),
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
    zip({
      file: 'dist.zip'
    }),
  ]
})
