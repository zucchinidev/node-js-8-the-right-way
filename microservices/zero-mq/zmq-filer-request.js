'use strict'

const zmq = require('zeromq')
const args = require('minimist')(process.argv)
const requester = zmq.socket('req')
requester.on('message', data => {
  const response = JSON.parse(data)
  console.log(`Received response:`, response)
})
requester.connect('tcp://localhost:60401')
const messages = [...Array(5).keys()]
messages.forEach((m) => {
  console.log(`Sending a request ${m} for ${args.filename}`)
  requester.send(JSON.stringify({
    path: args.filename
  }))
})
