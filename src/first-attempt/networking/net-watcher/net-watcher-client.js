'use strict'

const net = require('net')
const minimist = require('minimist')
const Client = require('./lib/line-delimited-json-protocol-client')
const args = minimist(process.argv)
const options = {}
if (args.unixSocket) {
  options.path = '/tmp/watcher.sock'
} else {
  options.port = 60300
}
const client = net.connect(options)
const ldjClient = Client.connect(client)
ldjClient.on('message', message => {
  if (message.type === 'watching') {
    console.log(`Now watching: ${message.file}`)
  } else if (message.type === 'changed') {
    const date = new Date(message.timestamp)
    console.log(`File changed: ${date}`)
  } else {
    console.log(`Unrecognized message type: ${message.type}`)
  }
})
