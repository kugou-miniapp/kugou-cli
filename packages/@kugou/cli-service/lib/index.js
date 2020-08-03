const { MiniAppZipWebpackPlugin } = require('./mini-app-zip-webpack-plugin')
const {
  getEntries,
  getHtmlWebpackPlugin
} = require('./webpack')

exports.MiniAppZipWebpackPlugin = MiniAppZipWebpackPlugin
exports.getEntries = getEntries
exports.getHtmlWebpackPlugin = getHtmlWebpackPlugin
