const User = require('../../models/user')
const {handleError} = require('../../middleware/utils')
const {getItems, checkQueryString} = require('../../middleware/db')
const {populateUser} = require('./validators')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
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

    if (req.query.role && req.query.role === 'admin') {
      query = {
        ...query,
        role: {$ne: 'user'}
      }
    } else if (req.query.role && req.query.role === 'client') {
      query = {
        ...query,
        role: 'user'
      }
    }
    res.status(200).json(await getItems(req, User, query, populateUser))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getUsers}
