const Newsletter = require('../../models/newsletter')
const {updateItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateNewsletter = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await updateItem(id, Newsletter, {...req}))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateNewsletter}
