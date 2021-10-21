const { error, info, done, exit, clearConsole } = require('@kugou-miniapp/cli-shared-utils')
const inquirer = require('inquirer')
const path = require('path')

exports.command = 'generate [name]'

exports.desc = '根据模板创建或修改文件'

exports.builder = {
  force: {
    desc: '存在同名文件时，是否直接覆盖',
    boolean: true,
    default: false
  },
  root: {
    alias: 'r',
    desc: '子包目录',
    type: 'string'
  }
}

exports.handler = async function(argv) {
  let { name, force, root } = argv
  if (!name) {
    const answers = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: '请输入新入口名字：'
      }
    ])

    if (!answers.name) {
      error('新入口名字不可为空')
      exit()
      return
    }

    name = answers.name
  }

  const store = require('mem-fs').create()
  const memFs = require('mem-fs-editor').create(store)

  const appJSONPath = path.resolve('public/app.json')
  const appJSON = memFs.readJSON(appJSONPath)

  const hasSameFiles = memFs.exists(path.resolve(`public/${name}.html`)) || memFs.exists(path.resolve(`src/entries/${name}.jsx`)) || memFs.exists(path.resolve(`src/pages/${name}.jsx`))
  const isSubPage = !!root

  if (hasSameFiles && !force) {
    error('存在同名文件，终止创建！')
    exit()
  }

  info(`开始创建新入口${name}，请勿退出！`)

  const templatePath = input => path.resolve('templates/page', input)
  const destinationPath = output => path.resolve(output)

  const templateData = {
    pageName: name
  }

  memFs.copyTpl(templatePath('entry.*'), destinationPath('src/entries'), templateData, templateData, {
    processDestinationPath: str => path.resolve(path.dirname(str), `${name}${path.extname(str)}`)
  })
  memFs.copyTpl(templatePath('page.*'), destinationPath('src/pages'), templateData, templateData, {
    processDestinationPath: str => path.resolve(path.dirname(str), `${name}${path.extname(str)}`)
  })
  memFs.copyTpl(templatePath('index.html'), destinationPath(`public/${isSubPage ? root + '/' : ''}${name}.html`), templateData, templateData, {
    processDestinationPath: str => path.resolve(path.dirname(str), `${name}${path.extname(str)}`)
  })


  if (!isSubPage) {
    const pages = appJSON.pages = appJSON.pages || []

    if (pages.findIndex(_ => _.name === name) < 0) {
      pages.push({
        path: `/${name}.html`
      })
    }
  } else {
    const subpackages = appJSON.subpackages || []
    const index = subpackages.findIndex(_ => _.root === root)
    if (index < 0) {
      subpackages.push({
        root,
        pages: [
          name
        ]
      })
    } else if (!subpackages[index].pages.includes(name)) {
      subpackages[index].pages.push(name)
    }

    appJSON.subpackages = subpackages
  }

  memFs.writeJSON(destinationPath('public/app.json'), appJSON)

  memFs.commit(async err => {
    clearConsole()

    if (err) {
      error(`写入失败 ${JSON.stringify(err)}`)
      exit()
    }

    done(`新入口${name}创建成功。`)
  })
}
