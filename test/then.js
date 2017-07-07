/**
 * Test dependencies.
 */

const test = require('tape')
const Readable = require('stream').Readable
const thenable = require('..')


test('should resolve stream as promise', assert => {
  assert.plan(1)
  async function concat() {
    const result = await thenable(hello())
    assert.equal(result, 'hello')
  }
  concat()
})


test('should resolve stream as promise and pass buffer', assert => {
  assert.plan(2)
  async function concat() {
    const result = await thenable(hello(), true)
    assert.equal(Buffer.isBuffer(result), true)
    assert.equal(result.toString(), 'hello')
  }
  concat()
})


test('should reject stream as promise', assert => {
  assert.plan(1)
  async function concat() {
    try {
      const result = await thenable(hello(true))
    } catch(error) {
      assert.equal(error.message, 'hello')
    }
  }
  concat()
})


test('should do nothing if a promise is passed and return it', assert => {
  assert.plan(2)
  const promise = new Promise(resolve => {
    setTimeout(() => resolve('hello'), 500)
  })
  const result = thenable(promise)
  assert.equal(promise, result)
  result.then(data => {
    assert.equal(data, 'hello')
  })
})


/**
 * Create readable stream returning hello
 * after 1 second.
 *
 * @param {Boolean} rejected
 * @return {Stream}
 * @api private
 */

function hello(rejected) {
  const data = new Readable
  data._read = function() {}
  setTimeout(() => {
    if(rejected) {
      data.emit('error', new Error('hello'))
    } else {
      data.push('hello')
      data.push(null)
    }
  }, 1000)
  return data
}
