/**
 * Dependencies
 */

const concat = require('concat-stream')

/**
 *
 */

module.exports = function(stream, bufferMode) {
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
