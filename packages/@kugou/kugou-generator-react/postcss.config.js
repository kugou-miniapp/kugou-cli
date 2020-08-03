const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    pxtoviewport({
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 3,
      propList: ['*', '!border', '!border-top', '!border-right', '!border-bottom', '!border-left'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/],
      landscape: false,
      landscapeUnit: 'vw',
    })
  ]
};
