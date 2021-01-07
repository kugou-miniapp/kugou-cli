# `@kugou-miniapp/cli-service`


## mini-app-zip-webpack-plugin

```javascript
const { MiniAppZipWebpackPlugin } = require('@kugou-miniapp/cli-service')

module.exports = {
  plugins: [
    new MiniAppZipWebpackPlugin({
      r: [
        {
          name: "index"
        }
      ], // 规则数组
      exclude: /\.map$/ // 排序文件规则，必须为正则，默认去除sourcemap
      t: 'dist', // 输出文件夹
      d: 'dist' // 文件地址
    })
  ]
}
```
