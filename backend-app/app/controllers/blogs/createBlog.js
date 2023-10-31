const Blog = require('../../models/blog')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const slugify = require('slugify')
const {populateBlog} = require('./validators')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBlog = async (req, res) => {
  try {
    const data = {
      slug: slugify(req.body.title),
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Blog, populateBlog))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createBlog}
