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
      exclude: /\.map$/ // 排序文件规则，为正则表达式，默认去除sourcemap
      t: 'dist', // 默认输出文件夹
      d: 'dist' // 默认文件地址
    })
  ]
}
```
