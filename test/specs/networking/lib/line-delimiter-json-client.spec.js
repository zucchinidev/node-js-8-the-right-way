const { EventEmitter } = require('events')

const LineDelimiterJsonClient = require('../../../../src/networking/lib/line-delimiter-json-client')

describe('line-delimiter-json-client', () => {
  let stream = null
  let client = null

  beforeEach(() => {
    stream = new EventEmitter()
    client = new LineDelimiterJsonClient(stream)
  })

  it(`should emit a message event from a single data event`, done => {
    client.on('message', message => {
      expect(message).toEqual({ foo: 'bar' })
      done()
    })
    stream.emit('data', '{"foo": "bar"}\n')
  })
})
