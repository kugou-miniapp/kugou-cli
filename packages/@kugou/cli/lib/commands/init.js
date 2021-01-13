const fs = require('fs')
const path = require('path')
const globby = require('globby')
const inquirer = require('inquirer')
const _ = require('lodash')
const { hasYarn, clearConsole, info, done, chalk, execa } = require('@kugou-miniapp/cli-shared-utils')
const PackageManager = require('../util/package-manager')
const { OFFICIAL_SCOPE, GENERATOR_PREFIX } = require('../util/const')
const track = require('../util/track')

exports.command = 'init <projectName>'
exports.desc = '初始化一个新项目'
exports.builder = {
  appid: {
    desc: '小程序id'
  },
  appkey: {
    desc: '小程序权限校验码'
  },
  generator: {
    alias: 'g',
    desc: '项目初始化使用模板'
  }
}

exports.handler = async function (argv) {
  const store = require('mem-fs').create()
  const memFs = require('mem-fs-editor').create(store)
  const { projectName } = argv

  let paths = []
  let modules = []
  let generator;
  const pm = new PackageManager()

  // 1. 询问采用的generator
  if (argv.generator) {
    generator = argv.generator
  } else {
    const answers = await inquirer.prompt([{
      name: 'generator',
      type: 'list',
      message: '请选择您使用的项目模板',
      choices: [{
        name: 'react',
        value: 'react'
      }, {
        name: 'vue',
        value: 'vue'
      }, {
        name: 'svelte',
        value: 'svelte'
      }]
    }])

    generator = answers.generator
  }

  const generatorBaseName = GENERATOR_PREFIX + generator
  const generatorName = OFFICIAL_SCOPE + '/' + generatorBaseName

  // 2. 获取全局模块安装目录，npm和yarn
  if (hasYarn()) {
    const { stdout: yarnGlobalDir } = await execa('yarn', ['global', 'dir'])
    paths.push(path.resolve(yarnGlobalDir, 'node_modules'))
  } else {
    const { stdout: npmGlobalDir } = await execa('npm', ['root', '-g'])

    paths.push(path.resolve(npmGlobalDir))
  }

  paths = _.uniq(paths)

  // 3. 判断是否安装默认的kugou-generator-vue和kugou-generator-react
  const findModules = () => {
    let modules = []

    for (const root of paths) {
      if (!fs.existsSync(root) || (!fs.lstatSync(root).isDirectory())) {
        continue
      }

      // 部分目录可能对当前用户不可读，故需要捕获错误，见yeoman-environment resolver.js
      try {
        // modules = modules.concat(globby.sync(generatorBaseName + '*', {
        //   cwd: root,
        //   onlyDirectories: true,
        //   absolute: true,
        //   baseNameMatch: true,
        //   deep: 0
        // }))

        // 只下载官方模板
        const scopes = globby.sync(
          [`${OFFICIAL_SCOPE}*`],
          {cwd: root, onlyDirectories: true, absolute: true, deep: 0}
        );

        for (const scope of scopes) {
          modules = modules.concat(globby.sync(
            generatorBaseName + '*',
            {
              cwd: scope,
              onlyDirectories: true,
              absolute: true,
              baseNameMatch: true,
              deep: 0
            }
          ));
        }
      } catch(error) {
        console.error(error)
      }
    }

    return modules
  }

  // modules = findModules()

  // 4. 没有安装对应的官方模板，需要先安装
  if (modules.length === 0) {
    info(`现在下载模板 (${chalk.yellow(generatorName)})...`)
    await pm.add([generatorName, '--registry', 'https://registry.npm.taobao.org'], { global: true })
    clearConsole()
    done('下载模板成功')
  }

  modules = findModules()

  // 5. 创建项目目录，复制对应的generator并调整
  const generatorPath = modules.filter(_ => _.includes(generatorBaseName))[0]
  const projectPath = path.resolve(projectName)
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }

  // 5.1 同步generaotr所有文件
  const files = globby.sync(['**', '!dist', '!node_modules', '!yarn.lock', '!package-lock.json', '!README.md', '.env', '.browserslistrc', '.gitignore'], { cwd: generatorPath })

  const templatePath = input => path.join(generatorPath, input)
  const destinationPath = output => path.join(projectPath, output)

  files.forEach(_ => {
    memFs.copy(templatePath(_), destinationPath(_))
  })

  // 5.2 修改README.md
  const templateData = {
    projectName
  }
  memFs.copyTpl(templatePath('templates/README.md'), destinationPath('README.md'), templateData, templateData)

  // 5.3 修改package.json
  const packageJSONPath = destinationPath('package.json')
  const packageJSON = memFs.readJSON(packageJSONPath)
  packageJSON.name = projectName
  packageJSON.author = ''
  memFs.writeJSON(packageJSONPath, packageJSON)

  // 5.4 修改app.json
  const appJSONPath = destinationPath('public/app.json')
  const appJSON = memFs.readJSON(appJSONPath)
  appJSON.appid = argv.appid || ''
  appJSON.appkey = argv.appkey || ''
  memFs.writeJSON(appJSONPath, appJSON)

  // 5.5 生成gitignore
  const gitignorePath = destinationPath('.gitignore')
  memFs.write(gitignorePath, `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.render
  `)

  memFs.commit(async err => {
    if (err) return console.log(err)

    // 6. 安装项目依赖
    info('现在安装项目依赖...')
    const pm = new PackageManager({ context: projectPath })
    await pm.install(['--registry', 'https://registry.npm.taobao.org'])
    clearConsole()
    done(`${chalk.green('项目初始化完成！')}`)
    done(`${chalk.green('开发者文档参考：http://open.kugou.com/docs/mini-app/#/README')}`)
    done(`${chalk.green(`打开${projectPath}目录，执行${pm.bin} run serve命令，开始您的开发之旅~`)}`)

    track({
      a: 22745,
      ft: 'cli工具创建'
    })
  })
}
