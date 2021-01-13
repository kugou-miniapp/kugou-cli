const globby = require('globby')
const OFFICIAL_SCOPE = '@kugou-miniapp*'

const globalDir = 'C:/Users/chrisliang/AppData/Local/Yarn/Data/global/node_modules'

const scopes = globby.sync(
  [OFFICIAL_SCOPE],
  {cwd: globalDir, onlyDirectories: true, absolute: true, deep: 0}
);

console.log(scopes)
