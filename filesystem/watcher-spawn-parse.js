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
  const ls = spawn('ls', ['-l', '-h', __dirname])
  let data = ''
  ls.stdout.on('data', chunk => (data += chunk))
  console.log(__dirname)
  ls.on('close', () => {
    const lines = data.split(/\n/)
    lines.shift()
    lines.pop()
    if (lines.length) {
      console.log('file | permissions | size')
    }
    lines.forEach(line => {
      const [permissions, _, user, group, size, month, day, time, file] = line.split(/\s+/)
      console.log(`${file} | ${permissions} | ${size}`)
    })
  })
})

console.log(`now watching ${filename} for changes...`)