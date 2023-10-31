const Seller = require('../../models/seller')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateSeller} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllSellers = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false
      }
    } else if (
      req.query.published_only &&
      req.query.published_only === 'false'
    ) {
      query = {
        ...query,
        suspended: true
      }
    }

    if (req.query.verified_only && req.query.verified_only === 'true') {
      query = {
        ...query,
        verified: true
      }
    } else if (req.query.verified_only && req.query.verified_only === 'false') {
      query = {
        ...query,
        verified: false
      }
    }

    if (req.query.deleted_only && req.query.deleted_only === 'true') {
      query = {
        ...query,
        deleted: true
      }
    }
    res.status(200).json(await getItems(req, Seller, query, populateSeller))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllSellers}
