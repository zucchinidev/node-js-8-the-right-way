'use strict'

const zmq = require('zeromq')
const filename = process.argv[2]

const requester = zmq.socket('req')
requester.on('message', data => {
  const response = JSON.parse(data)
  console.log('Received response: ', response)
})

requester.connect('tcp://localhost:60401')
console.log(`Sending a request for filename: ${filename}`)

requester.send(JSON.stringify({
  path: filename
}))

process.on('SIGINT', () => {
  console.log('Closing requester...')
  requester.close()
})
