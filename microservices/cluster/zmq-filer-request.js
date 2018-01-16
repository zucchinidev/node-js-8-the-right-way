'use strict'

const zmq = require('zeromq')
const args = require('minimist')(process.argv)
const requester = zmq.socket('req')

requester.on('message', data => {
  try {
    const response = JSON.parse(data)
    console.log(`Received response`, response)
  } catch (err) {
    console.log('An error occurred')
  }
})

requester.connect('tcp://127.0.0.1:60401')
for (const m of Array(5).keys()) {
  console.log(`Sending a request ${m} for ${args.filename}`)
  const data = { path: args.filename }
  requester.send(JSON.stringify(data))
}