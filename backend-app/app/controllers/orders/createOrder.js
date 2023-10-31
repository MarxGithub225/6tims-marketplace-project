const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {createOrderInDb} = require('./helpers/createOrderInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createOrder = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    req = matchedData(req)
    res.status(201).json(await createOrderInDb(id, req))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createOrder}
