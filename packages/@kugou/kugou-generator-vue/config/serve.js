const { generatePreviewQrcode, prepareUrls } = require('@kugou-miniapp/cli-shared-utils')

module.exports = api => {
  const { serve } = api.service.commands

  const serveFn = serve.fn
  serve.fn = (...args) => {
    return serveFn(...args).then(res => {
      const url = new URL(res.url)
      const urls = prepareUrls(url.protocol, '0.0.0.0', url.port, '/#/')

      const previewUrl = `${url.protocol}//${urls.lanUrlForConfig}:${url.port}/#/`
      generatePreviewQrcode(previewUrl)
    })
  }
}
