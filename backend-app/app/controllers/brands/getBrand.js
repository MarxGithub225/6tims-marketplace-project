const {matchedData} = require('express-validator')
const Brand = require('../../models/brand')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')

const {populateBrand} = require('./validators')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBrand = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Brand, populateBrand))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getBrand}
