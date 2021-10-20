const { MiniAppZipWebpackPlugin, MiniAppZipVitePlugin } = require('./zip-plugin')
const { getEntries } = require('./webpack')

exports.MiniAppZipWebpackPlugin = MiniAppZipWebpackPlugin
exports.MiniAppZipVitePlugin = MiniAppZipVitePlugin
exports.getEntries = getEntries
