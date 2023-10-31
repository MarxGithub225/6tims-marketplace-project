const Blog = require('../../models/blog')
const {updateItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const slugify = require('slugify')
const {populateBlog} = require('./validators')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBlog = async (req, res) => {
  try {
    const data = {
      slug: slugify(req.body.title),
      updatedBy: req.user._id
    }
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res
      .status(200)
      .json(await updateItem(id, Blog, {...req, ...data}, populateBlog))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateBlog}
