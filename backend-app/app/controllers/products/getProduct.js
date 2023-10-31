const {matchedData} = require('express-validator')
const Product = require('../../models/product')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateProduct} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProduct = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Product, populateProduct))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getProduct}
