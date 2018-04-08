'use strict'

const { EventEmitter } = require('events')

class LineDelimitedJSONProtocolClient extends EventEmitter {
  constructor (stream) {
    super()
    if (!stream) {
      throw new Error('stream parameter is mandatory')
    }
    this.stream = stream
    this.buffer = ''
    this.setEvents()
  }

  setEvents () {
    this.stream.on('data', this.onReceivingData.bind(this))
  }

  onReceivingData (chunk) {
    this.buffer += chunk

    let boundary = this.buffer.indexOf('\n')
    while (boundary !== -1) {
      const input = this.buffer.substring(0, boundary)
      this.buffer = this.buffer.substring(boundary + 1)
      this.emit('message', JSON.parse(input))
      boundary = this.buffer.indexOf('\n')
    }
  }

  static connect (stream) {
    return new LineDelimitedJSONProtocolClient(stream)
  }
}

module.exports = LineDelimitedJSONProtocolClient
