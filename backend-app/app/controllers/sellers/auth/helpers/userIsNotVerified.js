const {buildErrObject} = require('../../../../middleware/utils')

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userIsNotVerified = (user = {}) => {
  return new Promise((resolve, reject) => {
    if (!user.verified) {
      return reject(buildErrObject(409, 'NOT_VERIFIED_USER'))
    }
    resolve(true)
  })
}

module.exports = {userIsNotVerified}
