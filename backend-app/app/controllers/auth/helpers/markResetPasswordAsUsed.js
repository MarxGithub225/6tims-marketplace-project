const {
  getBrowserInfo,
  getCountry,
  itemNotFound,
  buildSuccObject
} = require('../../../middleware/utils')

/**
 * Marks a request to reset password as used
 * @param {Object} req - request object
 * @param {Object} forgot - forgot object
 */
const markResetPasswordAsUsed = (req = {}, forgot = {}) => {
  return new Promise((resolve, reject) => {
    forgot.used = true
    forgot.browserChanged = getBrowserInfo(req)
    forgot.addressChanged = getCountry(req)
    forgot.save(async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(buildSuccObject('PASSWORD_CHANGED'))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {markResetPasswordAsUsed}
