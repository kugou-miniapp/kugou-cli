const {
  hasYarn,
  hasProjectYarn,
  hasProjectNpm,

  resolvePkg
} = require('@kugou-miniapp/cli-shared-utils')
const { executeCommand } = require('../util/execute-command')

const PACKAGE_MANAGER_CONFIG = {
  npm: {
    run: ['run'],
    install: ['install', '--loglevel', 'error'],
    add: ['install', '--loglevel', 'error'],
    upgrade: ['update', '--loglevel', 'error'],
    remove: ['uninstall', '--loglevel', 'error']
  },
  yarn: {
    run: ['run'],
    install: [],
    add: ['add'],
    upgrade: ['upgrade'],
    remove: ['remove']
  }
}

class PackageManager {
  constructor({
    context = process.cwd(),
    forcePackageManager
  } = {}) {
    this.context = context

    if (forcePackageManager) {
      this.bin = forcePackageManager
    } else {
      if (hasProjectYarn(context)) {
        this.bin = 'yarn'
      } else if (hasProjectNpm(context)) {
        this.bin = 'npm'
      } else {
        this.bin = hasYarn() ? 'yarn' : 'npm'
      }
    }

    this.projectPkg = resolvePkg(this.context)
  }

  executeCommand(command, args = [], { global = false } = {}) {
    const commandArgs = [
      ...(PACKAGE_MANAGER_CONFIG[this.bin][command] || []),
      ...args
    ]

    if (global) {
      if (this.bin === 'npm') {
        commandArgs.push('-g')
      } else if (this.bin === 'yarn') {
        commandArgs.unshift('global')
      }
    }

    return executeCommand(this.bin, commandArgs, this.context)
  }

  install(args, options) {
    return this.executeCommand('install', args, options)
  }

  run(args) {
    return this.executeCommand('run', args)
  }

  add(args, options) {
    return this.executeCommand('add', args, options)
  }

  remove() {}

  upgrade() {}
}

module.exports = PackageManager
