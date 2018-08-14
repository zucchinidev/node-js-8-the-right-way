'use strict'

const zmq = require('zeromq')
const ipcAddr = 'ipc://file-work.ipc'

const producer = zmq.socket('push')
producer.bindSync(ipcAddr)
const works = [...Array(100).keys()]
works.forEach(w => producer.send(`some work number: ${w}`))
