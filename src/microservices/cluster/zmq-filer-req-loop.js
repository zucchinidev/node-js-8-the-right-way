'use strict'

const zmq = require('zeromq')
const filename = process.argv[2]

const requester = zmq.socket('req')
requester.on('message', data => {
  const response = JSON.parse(data)
  console.log('Received response: ', response)
})

requester.connect('tcp://127.0.0.1:60401');

[...Array(5).keys()].forEach(i => {
  console.log(`Sending request ${i} for ${filename}`)
  requester.send(JSON.stringify({ path: filename }))
})

process.on('SIGINT', () => {
  console.log('Closing requester...')
  requester.close()
})
