const Banner = require('../../models/banner')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateBanner} = require('./validators')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllBanners = async (req, res) => {
  try {
    let query = await checkQueryString(req.query)
    if (req.query.published_only && req.query.published_only === 'true') {
      query = {
        ...query,
        suspended: false,
        startDate: {
          $lte: new Date()
        },
        endDate: {
          $gte: new Date()
        }
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
    res.status(200).json(await getItems(req, Banner, query, populateBanner))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllBanners}
