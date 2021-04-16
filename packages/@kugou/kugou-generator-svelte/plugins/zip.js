const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const Cache = {
  distdir: 'distdir',
  outfile: 'outfile',
  sourcemapFile: 'sourcemapFile',
}

module.exports = (options) => ({
  name: 'zip',
  enforce: 'post',
  generateBundle({dir, sourcemap, sourcemapFile}) {
    // Save the output directory path
    let distDir = process.cwd()
    if (dir) {
      distDir = path.resolve(distDir, dir)
    }
    this.cache.set(Cache.distdir, distDir)
    if (sourcemap) {
      this.cache.set(Cache.sourcemapFile, sourcemapFile)
    }
    // Get options
    let outFile = options && options.file || 'dist.zip'
    const outDir = options && options.dir
    if (outFile) {
      if (outDir) {
        this.warn('Both the `file` and `dir` options are set - `dir` has no effect')
      }
      if (!path.isAbsolute(outFile)) {
        outFile = path.resolve(distDir, outFile)
      }
    }
    // Save the output file path
    this.cache.set(Cache.outfile, outFile)
  },

  writeBundle(_options, bundle) {
    return new Promise(resolve => {
      const distDir = this.cache.get(Cache.distdir)
      const outputFile = this.cache.get(Cache.outfile)

      const output = fs.createWriteStream(outputFile);

      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      archive.pipe(output);
      archive.glob('**/*.*', {
        cwd: distDir,
        ignore: options.exclude || ['*.zip', '**.map']
      });

      archive.finalize().then(resolve);
    })
  },
})