const Product = require('../../models/product')
const {checkQueryString} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateProduct} = require('./validators')
const {getBestItems} = require('./helpers')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllBestProducts = async (req, res) => {
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
        sellerId: req.user._id
      }
    }
    if (req.query.categoryId) {
      query = {
        ...query,
        categoryId: req.query.categoryId
      }
    }

    if (req.query.category2Id) {
      query = {
        ...query,
        category2Id: req.query.category2Id
      }
    }

    if (req.query.category3Id) {
      query = {
        ...query,
        category3Id: req.query.category3Id
      }
    }
    res
      .status(200)
      .json(await getBestItems(req, Product, query, populateProduct))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllBestProducts}
