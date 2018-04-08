'use strict'

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const filename = process.argv[2]

if (!filename) {
  throw Error('a file to watch must be specified!')
}

const pathToFile = path.resolve(__dirname, filename)
fs.watch(pathToFile, () => {
  const ls = spawn('ls', ['-l', '-h', pathToFile])
  ls.stdout.pipe(process.stdout)
})

console.log(`now watching ${filename} for changes...`)
