'use strict'

const net = require('net')
const client = net.connect({ port: 60300 })
client.on('data', data => {
  try {
    const message = JSON.parse(data);
    (message.type === 'watching')
      ? console.log(`Now watching: ${message.file}`)
      : (message.type === 'changed')
      ? console.log(`File changed: ${new Date(message.timestamp)}`)
      : console.log(`Unrecognized message type: ${message.type}`)
  } catch (err) {
    console.log(`Opps... ${err}`)
    process.exit(1)
  }
})
