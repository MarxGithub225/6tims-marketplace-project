const {v4: uuidv4} = require('uuid')
const ForgotPassword = require('../../../models/forgotPassword')
const {
  getBrowserInfo,
  getCountry,
  buildErrObject
} = require('../../../middleware/utils')

/**
 * Creates a new password forgot
 * @param {Object} req - request object
 */
const saveForgotPassword = (req = {}) => {
  return new Promise((resolve, reject) => {
    const forgot = new ForgotPassword({
      email: req.body.email,
      verification: uuidv4(),
      browserRequest: getBrowserInfo(req),
      addressRequest: getCountry(req)
    })
    forgot.save((err, item) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = {saveForgotPassword}
