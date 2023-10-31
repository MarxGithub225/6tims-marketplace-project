const {buildErrObject} = require('../../../../middleware/utils')

/**
 * Checks if blockExpires from user is greater than now
 * @param {Object} user - user object
 */
const userIsDeleted = (user = {}) => {
  return new Promise((resolve, reject) => {
    if (user.deleted) {
      return reject(buildErrObject(409, 'DELETED_USER'))
    }
    resolve(true)
  })
}

module.exports = {userIsDeleted}
