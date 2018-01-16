'use strict'
const fs = require('fs')
const zmq = require('zeromq')

function createReplaySocket (ipcFile) {
  const responder = zmq.socket('rep').connect(ipcFile)
  responder.on('message', data => {
    const request = JSON.parse(data)
    console.log(`${process.pid} received request for: ${request.path}`)
    fs.readFile(request.path, (error, data) => {
      let sendData = {}
      console.log(`${process.pid} sending response`)
      if (error) {
        sendData = { error }
      } else {
        sendData = {
          content: data.toString(),
          timestamp: Date.now(),
          pid: process.pid
        }
      }
      responder.send(JSON.stringify(sendData))
    })
  })
}

module.exports = createReplaySocket
