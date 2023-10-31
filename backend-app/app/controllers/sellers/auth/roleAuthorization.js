const {checkSellerPermissions} = require('./helpers')

const {handleError} = require('../../../middleware/utils')

/**
 * Roles authorization function called by route
 * @param {Array} roles - roles specified on the route
 */
const roleAuthorization = (roles) => async (req, res, next) => {
  try {
    const data = {
      id: req.user._id,
      roles
    }
    await checkSellerPermissions(data, next)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {roleAuthorization}
