const {matchedData} = require('express-validator')
const Seller = require('../../models/seller')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateSeller} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getSeller = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Seller, populateSeller))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getSeller}
