const Blog = require('../../models/blog')
const {checkQueryString, getItems} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateBlog} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRecentBlogs = async (req, res) => {
  try {
    const id = await isIDGood(req.params.id)
    let query = await checkQueryString(req.query)
    query = {
      ...query,
      _id: {$ne: id}
    }
    res.status(200).json(await getItems(req, Blog, query, populateBlog))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getRecentBlogs}
