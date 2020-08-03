import { useEffect } from 'react'

const useMiniApp = (handler, target = window) => {
  useEffect(() => {
    if (!handler) return;

    if (!target) return;

    target.addEventListener('KugouJSBridgeReady', handler)

    // 若已注入直接出发回调
    if ('MiniApp' in target) {
      target.dispatchEvent(new CustomEvent('KugouJSBridgeReady', {
        detail: {
          MiniApp: target.MiniApp
        }
      }))
    }

    return () => {
      target.removeEventListener('KugouJSBridgeReady', handler)
    }
  }, [target, handler])
}

export {
  useMiniApp
}
