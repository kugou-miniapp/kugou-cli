const { execa } = require('@kugou/cli-shared-utils')

exports.executeCommand = function executeCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd,
      stdio: 'inherit'
    })

    child.on('close', code => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
      } else {
        resolve()
      }
    })
  })
}
