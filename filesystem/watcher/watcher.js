'use strict'

/*
*  A simple program that watch files
*  for changes and read arguments from the command line
*/
const minimist = require('minimist')
const spawn = require('child_process').spawn

const fs = require('fs')
const args = minimist(process.argv)
if (!args.filename) {
  throw Error('A file to watch must be specified!')
}
const { filename } = args
fs.watch(filename, () => {
  const ls = spawn('ls', ['-l', '-h', filename])
  let output = ''
  ls.stdout.on('data', chunk => (output += chunk))
  ls.on('close', () => {
    const parts = output.split(/\s+/)
    const permissions = parts[0]
    const size = parts[4]
    const filename = parts[8]
    console.log([permissions, size, filename])
  })
})
console.log(`Now watching ${filename} for changes...`)
