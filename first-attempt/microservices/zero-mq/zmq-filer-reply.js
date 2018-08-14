'use strict'

const fs = require('fs')
const zmq = require('zeromq')
const responder = zmq.socket('rep')
responder.on('message', data => {
  const request = JSON.parse(data)
  console.log(`Received request to get: ${request.path}`)
  fs.readFile(request.path, (err, data) => {
    if (err) {
      throw err
    }
    console.log(`Sending response content.`)
    const content = {
      content: data.toString(),
      timestamp: Date.now(),
      pid: process.pid
    }
    responder.send(JSON.stringify(content))
  })
})

responder.bind('tcp://*:60401', () => console.log('Listening for zmq requesters...'))
// Close the responder when the Node process ends.
process.on('SIGINT', () => {
  console.log('Shutting down...')
  responder.close()
})
