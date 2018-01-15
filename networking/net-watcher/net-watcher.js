'use strict'

const fs = require('fs')
const net = require('net')
const minimist = require('minimist')
const args = minimist(process.argv)
if (!args.filename) {
  throw Error('Error: no filename specified.')
}
const { filename } = args
if (typeof filename === 'string') {
  fs.access(filename, err => (err) ? console.log('No access!!') : createTCPServer(filename))
}

function createTCPServer (filename) {
  net.createServer(connection => {
    console.log('Subscriber connected.')
    connection.write(`Now watching ${filename} for changes...\n`)
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`))

    connection.on('close', () => {
      console.log('Subscriber disconnected')
      watcher.close()
    })
  }).listen(60300, _ => console.log('Listening for subscribers...'))
}

// Create client: nc localhost 60300
