'use strict'

const fs = require('fs')
const net = require('net')
const minimist = require('minimist')
const args = minimist(process.argv)
if (!args.filename) {
  throw Error('Error: no filename specified.')
}
let unixSocketOrPort = 60300
if (args.unixSocket) {
  unixSocketOrPort = '/tmp/watcher.sock'
}
const { filename } = args
if (typeof filename === 'string') {
  fs.access(filename, err => (err) ? console.log('No access!!') : createTCPServer(filename))
}

function createTCPServer (filename) {
  net.createServer(connection => {
    console.log('Subscriber connected.')
    connection.write(JSON.stringify({ type: 'watching', file: filename }) + '\n')
    const watcher = fs.watch(filename, () => connection.write(
      JSON.stringify({ type: 'changed', timestamp: Date.now() }) + '\n'
    ))

    connection.on('close', () => {
      console.log('Subscriber disconnected')
      watcher.close()
    })
  }).listen(unixSocketOrPort, _ => console.log('Listening for subscribers...'))
}

// Create client: nc localhost 60300
// watch -n -1 touch target.txt
// node net-watcher.js --filename target.txt --unixSocket -> socat UNIX-CONNECT:/tmp/watcher.sock STDIN when we use unix socket
