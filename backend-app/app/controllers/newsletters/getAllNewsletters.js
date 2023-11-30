const Newsletter = require('../../models/newsletter')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllNewsletters = async (req, res) => {
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
    res.status(200).json(await getItems(req, Newsletter, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllNewsletters}
