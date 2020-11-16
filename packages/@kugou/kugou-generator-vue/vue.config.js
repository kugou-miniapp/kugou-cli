const { MiniAppZipWebpackPlugin, getEntries } = require('@kugou-miniapp/cli-service')
const { prepareUrls } = require('@kugou-miniapp/cli-shared-utils')

module.exports = {
  chainWebpack: config => {
    config
      .externals({
        'mini-app': 'MiniApp'
      })

    if (process.env.VUE_APP_DEVTOOL && process.env.NODE_ENV === 'development') {
      const urls = prepareUrls('http', '0.0.0.0')

      config
        .plugin('define')
        .tap(args => {
          args[0]['process.env.DEVTOOL_HOST'] = JSON.stringify(urls.lanUrlForConfig)
          args[0]['process.env.DEVTOOL_PORT'] = JSON.stringify(8098)

          return args
        })
    }

    if (process.env.NODE_ENV === 'production') {
      config
      .plugin('mini-app-zip')
      .use(MiniAppZipWebpackPlugin, [
        {
          r: [
            {
              name: "index",
              content: "all"
            }
          ],
          t: 'dist',
          d: 'dist'
        }
      ])
    }
  },
  pages: getEntries(),
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/styles/mixins.scss"
        `
      },
      scss: {
        prependData: `
        @import "~@/styles/mixins.scss";
        `
      }
    }
  },
  devServer: {
    port: parseInt(process.env.PORT, 10) || 3000
  },
}
