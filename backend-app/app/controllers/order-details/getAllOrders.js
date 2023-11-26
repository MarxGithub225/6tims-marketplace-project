const Order = require('../../models/order-details')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError, isIDGood} = require('../../middleware/utils')
const {populateOrder} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllOrders = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.status) {
      query = {
        ...query,
        status: req.query.status
      }
    }
    if (req.query.sellerId) {
      const id = await isIDGood(req.query.sellerId)
      query = {
        ...query,
        sellerId: id
      }
    }
    res.status(200).json(await getItems(req, Order, query, populateOrder))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllOrders}
