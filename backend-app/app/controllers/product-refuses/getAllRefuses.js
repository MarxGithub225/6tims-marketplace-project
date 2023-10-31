const Refuse = require('../../models/product-refuse')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateRefuse} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllRefuses = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.validated && req.query.validated === 'true') {
      query = {
        ...query,
        validated: true
      }
    }
    res.status(200).json(await getItems(req, Refuse, query, populateRefuse))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllRefuses}
