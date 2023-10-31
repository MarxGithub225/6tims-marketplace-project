const Brand = require('../../models/brand')
const {updateItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateBrand} = require('./validators')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBrand = async (req, res) => {
  try {
    const data = {
      updatedBy: req.user._id
    }
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res
      .status(200)
      .json(await updateItem(id, Brand, {...req, ...data}, populateBrand))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateBrand}
