const {matchedData} = require('express-validator')
const {verifyUser, findUserById} = require('./helpers')

const {handleError} = require('../../../middleware/utils')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await findUserById(req.id)
    res.status(200).json(await verifyUser(user))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {verify}
