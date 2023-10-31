const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {updateProductsViewsInDb} = require('./helpers/updateProductsViewsInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const viewProduct = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const productId = await isIDGood(req.params.productId)
    req = matchedData(req)
    res.status(201).json(await updateProductsViewsInDb(id, productId))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {viewProduct}
