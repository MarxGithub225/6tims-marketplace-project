const {matchedData} = require('express-validator')
const Order = require('../../models/order-details')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateOrder} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getOrder = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Order, populateOrder))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getOrder}
