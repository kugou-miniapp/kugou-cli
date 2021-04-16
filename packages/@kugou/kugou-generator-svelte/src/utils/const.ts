const isIOS = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent)
const isKugouMiniApp = 'MiniApp' in window

let systemInfo = isKugouMiniApp ? window.MiniApp.getSystemInfoSync() : {}

if (typeof systemInfo === 'string') {
  systemInfo = JSON.parse(systemInfo)
}
systemInfo.toolBarMoreTop = systemInfo.toolBarMoreTop || 20
const capsuleHeight = 30

export {
  isIOS,
  isKugouMiniApp,
  systemInfo,
  capsuleHeight
}
