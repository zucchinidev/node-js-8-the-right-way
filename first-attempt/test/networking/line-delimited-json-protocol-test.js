'use strict'
/* global beforeEach, describe, it */
const assert = require('assert')
const { EventEmitter } = require('events')
const LDJClient = require('../../networking/net-watcher/lib/line-delimited-json-protocol-client')
describe('LDJClient', () => {
  let stream = null
  let client = null
  beforeEach(() => {
    stream = new EventEmitter()
    client = new LDJClient(stream)
  })

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, { foo: 'bar' })
      done()
    })

    stream.emit('data', JSON.stringify({ foo: 'bar' }) + '\n')
  })

  it('should emit a message event from a split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, { foo: 'bar' })
      done()
    })

    stream.emit('data', '{ "foo":')
    process.nextTick(() => stream.emit('data', '"bar"}\n'))
  })

  it('should emit two message event from a compose data event', done => {
    let count = 0
    client.on('message', message => {
      count += 1
      if (count === 2) {
        assert.deepEqual(message, { bar: 'foo' })
        done()
      } else {
        assert.deepEqual(message, { foo: 'bar' })
      }
    })

    const firstEvent = JSON.stringify({ foo: 'bar' })
    const secondEvent = JSON.stringify({ bar: 'foo' })
    const data = `${firstEvent}\n${secondEvent}\n`
    stream.emit('data', data)
  })

  it('should throw an error', () => {
    assert.throws(() => new LDJClient(null), /stream parameter is mandatory/)
  })
})
