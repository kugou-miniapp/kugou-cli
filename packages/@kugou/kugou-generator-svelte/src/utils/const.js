const isKugouMiniApp = /KugouMiniApp/.test(window.navigator.userAgent)

let systemInfo = window.MiniApp ? window.MiniApp.getSystemInfoSync() : {}

if (typeof systemInfo === 'string') {
  systemInfo = JSON.parse(systemInfo)
}
const capsuleHeight = 30

export {
  isKugouMiniApp,
  systemInfo,
  capsuleHeight
}
