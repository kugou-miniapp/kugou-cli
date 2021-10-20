const { MiniAppZipWebpackPlugin, getEntries } = require('@kugou-miniapp/cli-service')

const rawEntries = getEntries('')
const entries = Object.entries(rawEntries).reduce((pre, [key, value]) => {
  pre[value.name] = value.path;
  return pre;
}, {});

module.exports = {
  chainWebpack: config => {
    config
      .externals({
        'mini-app': 'MiniApp'
      })
      .output
        .chunkFilename("[name].js")
        .filename("[name].js");
    config.module
      .rule("images")
      .use("url-loader")
      .options({
        limit: 4096,
        fallback: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]"
          }
        }
      });
    config.module
      .rule("media")
      .use("url-loader")
      .options({
        limit: 4096,
        fallback: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]"
          }
        }
      });

    for (let key in rawEntries) {
      const entry = rawEntries[key];

      if (entry.root === "index") continue;

      config.plugin(`html-${entry.name}`).tap(args => {
        args[0].base = "..";
        return args;
      });
    }

    if (process.env.NODE_ENV === "production") {
      config.plugin("mini-app-zip").use(MiniAppZipWebpackPlugin, [{}]);
    }
  },
  pages: entries,
  publicPath: './',
  css: {
    extract: process.env.NODE_ENV === 'development' ? false : {
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    },
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
