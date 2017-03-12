/**
 * Test dependencies.
 */

const test = require('tape')
const Readable = require('stream').Readable
const thenable = require('..')

test('should concat stream and get result through a then function', assert => {
  assert.plan(1)
  async function concat() {
    const result = await thenable(hello())
    assert.equal(result, 'hello')
  }
  concat()
})


/**
 * Create readable stream returning hello
 * after 1 second.
 *
 * @return {Stream}
 * @api private
 */

function hello() {
  const data = new Readable
  data._read = function() {}
  setTimeout(() => {
    data.push('hello')
    data.push(null)
  }, 1000)
  return data
}
