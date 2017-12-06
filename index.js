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
  return new Promise(function(resolve, reject) {
    stream.on('error', reject)
    stream.pipe(concat(data => {
      resolve(bufferMode ? data : data.toString())
    }))
  })

}
