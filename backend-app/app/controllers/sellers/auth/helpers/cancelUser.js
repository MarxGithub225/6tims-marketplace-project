const {buildErrObject} = require('../../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const cancelUser = (user = {}, cancellation = {}) => {
  console.log('cancellation', cancellation)
  return new Promise((resolve, reject) => {
    user.cancellation = cancellation
    user.suspended = true
    user.deleted = true
    user.save((err, item) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      resolve({
        email: item.email,
        cancelled: true
      })
    })
  })
}

module.exports = {cancelUser}
