const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {cancelUser, findUserById} = require('./auth/helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const cancelSeller = async (req, res) => {
  try {
    const reqId = matchedData(req)
    const id = await isIDGood(reqId.id)
    const user = await findUserById(id)
    res.status(200).json(await cancelUser(user, req.body.cancellation))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {cancelSeller}
