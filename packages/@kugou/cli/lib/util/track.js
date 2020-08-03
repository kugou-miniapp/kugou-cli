const { Tracker } = require('@kugou-miniapp/cli-shared-utils')
const getMac = require('getmac').default

const mid = getMac()

const tracker = new Tracker()

module.exports = function(data) {
  tracker.track({
    b: '统计',
    r: '小程序',
    mid,
    ...data
  })
}
