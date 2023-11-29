const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {commentProductInDb} = require('./helpers/commentProductInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const commentProduct = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const productId = await isIDGood(req.params.productId)
    req = matchedData(req)

    console.log('req', req)
    console.log('id', id)
    res
      .status(201)
      .json(await commentProductInDb(id, productId, req.comment, req.star))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {commentProduct}
