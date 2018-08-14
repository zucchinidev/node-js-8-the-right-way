'use strict'

const net = require('net')
const fs = require('fs')

const createServerWatcher = filename => {
  return net.createServer(connection => {
    console.log('Subscriber connected')
    connection.write(`Now is watching ${filename} for changes...\n`)
    const watcher = fs.watch(filename, () => connection.write(`File changed: ${new Date()}\n`))
    connection.on('close', () => {
      console.log('Subscriber disconnected.')
      watcher.close()
    })
  })
}
module.exports = {
  createServerWatcher
}
