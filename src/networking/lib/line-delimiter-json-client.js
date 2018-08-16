'use strict'

const { EventEmitter } = require('events')

class LineDelimiterJsonClient extends EventEmitter {
  constructor (stream) {
    super()
    let buffer = ''
    stream.on('data', data => {
      buffer += data
      const limiter = '\n'
      let existLimiter = buffer.includes(limiter)
      while (existLimiter) {
        const index = buffer.indexOf(limiter)
        const input = buffer.substring(0, index)
        buffer = buffer.substring(index + 1) // rest buffer
        this.emit('message', JSON.parse(input))
        existLimiter = buffer.includes(limiter)
      }
    })
  }

  static connect (stream) {
    return new LineDelimiterJsonClient(stream)
  }
}

module.exports = LineDelimiterJsonClient
