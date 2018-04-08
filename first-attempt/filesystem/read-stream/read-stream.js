'use strict'

const filename = process.argv[2]
require('fs').createReadStream(filename)
  .on('data', chunk => process.stdout.write(chunk))
  .on('error', err => process.stderr.write(`ERROR -> ${err.message}\n`))
