const Product = require('../../models/product')
const {checkQueryString} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {getItemsGroupByCategories} = require('./helpers')
const {ObjectId} = require('mongodb')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllProductsGroupByCategories = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    query = {
      ...query,
      new: false,
      suspended: false,
      cancelled: false,
      archived: false,
      approved: true
    }

    if (req.query.sellerId) {
      query = {
        ...query,
        sellerId: ObjectId(req.query.sellerId)
      }
    }
    res.status(200).json(await getItemsGroupByCategories(Product, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllProductsGroupByCategories}
