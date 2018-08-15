'use strict'

const net = require('net')
const netClient = net.connect({ port: 60300 })
const client = require('./lib/line-delimiter-json-client').connect(netClient)

client.on('message', message => {
  (message.type === 'watching')
    ? console.log(`Now watching: ${message.file}`)
    : (message.type === 'changed')
    ? console.log(`File changed: ${new Date(message.timestamp)}`)
    : console.log(`Unrecognized message type: ${message.type}`)
})
