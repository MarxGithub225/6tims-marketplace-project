const {matchedData} = require('express-validator')
const Blog = require('../../models/blog')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateBlog} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBlog = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Blog, populateBlog))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getBlog}
