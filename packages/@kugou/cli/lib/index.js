#!/usr/bin/env node

const yargs = require('yargs')
const track = require('./util/track')

yargs
  .scriptName('kugou')
  .usage('Usage: $0 <cmd> [options]')
  .help('h')
  .alias('h', 'help')
  .version()
  .global('version', false)
  .commandDir('commands')
  .demandCommand(1, "请提供至少一个命令")
  .epilog('更多细节参考https://github.com/kugou-miniapp/kugou-cli/tree/master/packages/@kugou/cli')
  .argv

track({
  a: 22746,
  ft: '使用cli工具'
})
