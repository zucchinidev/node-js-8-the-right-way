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
if (typeof filename === 'string') {
  fs.access(filename, err => (err) ? console.log('No access!!') : watchFile(filename))
}

function watchFile (filename) {
  console.log(`Now watching ${filename} for changes...`)
  fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename])
    const output = { data: Buffer.from('', 'utf8') }
    ls.stdout.on('data', concatData(output))
    ls.on('close', printData(output))
  })
}

function concatData (output) {
  return (chunk) => {
    output.data = Buffer.concat([output.data, chunk])
  }
}

function printData (output) {
  return () => {
    const parts = output.data.toString().split(/\s+/)
    const permissions = parts[0]
    const size = parts[4]
    const filename = parts[8]
    console.log([permissions, size, filename])
  }
}
