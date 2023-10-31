const {matchedData} = require('express-validator')
const Refuse = require('../../models/product-refuse')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateRefuse} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefuse = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Refuse, populateRefuse))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getRefuse}
