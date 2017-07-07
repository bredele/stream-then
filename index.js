/**
 * Dependencies
 */

const concat = require('concat-stream')


/**
 * Create a thenable object from a readable stream.
 *
 * Examples:
 *
 *  thenable(stream).then(value => {
 *    // do something with value
 *  })
 *
 * @param {Stream} stream
 * @param {Boolean} bufferMode
 * @return {Stream} stream
 * @api public
 */

module.exports = function(stream, bufferMode) {
  if (typeof stream.then === 'function') return stream
  const values = []
  const reasons = []
  stream.on('error', error => {
    reasons.map(reason => reason(error))
  })
  stream.pipe(concat(data => {
    values.map(value => value(bufferMode ? data : data.toString()))
  }))
  stream.then = function(resolved, rejected) {
    if(resolved) values.push(resolved)
    if(rejected) reasons.push(rejected)
  }
  return stream
}
