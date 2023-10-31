const User = require('../../../../models/seller')
const {itemNotFound, buildErrObject} = require('../../../../middleware/utils')

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkSellerPermissions = ({id = '', roles = []}, next) => {
  return new Promise((resolve, reject) => {
    User.findById(id, async (err, result) => {
      try {
        await itemNotFound(err, result, 'USER_NOT_FOUND')
        if (roles.includes('seller')) {
          return resolve(next())
        }
        reject(buildErrObject(401, 'UNAUTHORIZED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {checkSellerPermissions}
