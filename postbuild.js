const fs = require('fs')
const archiver = require('archiver')
const minify = require('html-minifier').minify

const MAX = 13 * 1024 // 13kb

fs.unlinkSync('./dist/bundle.js')
const content = fs.readFileSync('./dist/index.html')
const minified = minify(content.toString(), {
  collapseWhitespace: true,
  minifyCSS: true,
})
fs.writeFileSync('./dist/index.html', minified)

const output = fs.createWriteStream('./build.zip')
const archive = archiver('zip', { zlib: { level: 9 } })
output.on('close', function () {
  const bytes = archive.pointer()
  const percent = ((bytes / MAX) * 100).toFixed(2)
  if (bytes > MAX) {
    console.error(`Size overflow: ${bytes} bytes (${percent}%)`)
  } else {
    console.log(`Size: ${bytes} bytes (${percent}%)`)
  }
})

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.warn(err)
  } else {
    throw err
  }
})

archive.on('error', function (err) {
  throw err
})

archive.pipe(output)
archive.append(fs.createReadStream('./dist/index.html'), {
  name: 'index.html',
})

archive.finalize()
