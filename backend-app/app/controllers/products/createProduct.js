const Product = require('../../models/product')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateProduct} = require('./validators')
const slugify = require('slugify')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createProduct = async (req, res) => {
  try {
    const data = {
      slug: slugify(req.body.title),
      sellerId: req.user._id,
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Product, populateProduct))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createProduct}
