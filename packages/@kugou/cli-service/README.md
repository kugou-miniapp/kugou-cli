# `@kugou-miniapp/cli-service`


## MiniAppZipWebpackPlugin

```javascript
const { MiniAppZipWebpackPlugin } = require('@kugou-miniapp/cli-service')

module.exports = {
  plugins: [
    new MiniAppZipWebpackPlugin({})
  ]
}
```

## MiniAppZipVitePlugin

```javascript
const { MiniAppZipVitePlugin } = require('@kugou-miniapp/cli-service')

// vite.config.js
export default defineConfig({
  // ...
  plugins: [
    MiniAppZipVitePlugin({})
  ]
})
```
