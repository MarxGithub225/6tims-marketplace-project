const {buildErrObject} = require('../../../middleware/utils')

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userSuspended = (user = {}) => {
  return new Promise((resolve, reject) => {
    if (user.suspended) {
      return reject(buildErrObject(409, 'SUSPENDED_USER'))
    }
    resolve(true)
  })
}

module.exports = {userSuspended}
