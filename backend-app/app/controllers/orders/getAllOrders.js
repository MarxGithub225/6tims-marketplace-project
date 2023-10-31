const Order = require('../../models/order')
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
        orderStatus: req.query.status
      }
    }
    if (req.query.orderBy) {
      const id = await isIDGood(req.query.orderBy)
      query = {
        ...query,
        createdBy: id
      }
    }
    res.status(200).json(await getItems(req, Order, query, populateOrder))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllOrders}
