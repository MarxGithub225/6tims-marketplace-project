const Seller = require('../../models/seller')
const {updateItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateSeller} = require('./validators')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateSeller = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await updateItem(id, Seller, req, populateSeller))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateSeller}
