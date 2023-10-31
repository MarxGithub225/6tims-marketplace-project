const Brand = require('../../models/brand')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateBrand} = require('./validators')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBrand = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Brand, populateBrand))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createBrand}
