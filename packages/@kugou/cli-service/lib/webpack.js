const fs = require('fs')
const path = require('path')

function getEntries(baseDir = '') {
  const entries = {};
  const dir = path.resolve(baseDir, 'src/entries');
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const extname = path.extname(fullPath);
    const basename = path.basename(file, extname);

    if (/\.jsx?/.test(extname)) {
      entries[basename] = fullPath
    }
  });
  return entries;
}

exports.getEntries = getEntries
