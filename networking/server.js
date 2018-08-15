'use strict'

const net = require('net')
const fs = require('fs')

function write (connection, data) {
  connection.write(`${JSON.stringify(data)}\n`)
}

const createServerWatcher = filename => {
  return net.createServer(connection => {
    console.log('Subscriber connected')
    write(connection, { type: 'watching', file: filename })
    const watcher = fs.watch(filename, () => write(connection, { type: 'changed', timestamp: Date.now() }))
    connection.on('close', () => {
      console.log('Subscriber disconnected.')
      watcher.close()
    })
  })
}
module.exports = {
  createServerWatcher
}
