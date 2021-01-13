#!/usr/bin/env node

const yargs = require('yargs')

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
