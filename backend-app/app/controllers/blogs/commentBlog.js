const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {commentBlogInDb} = require('./helpers/commentBlogInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const commentBlog = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const blogId = await isIDGood(req.params.blogId)
    req = matchedData(req)
    res.status(201).json(await commentBlogInDb(id, blogId, req.comment))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {commentBlog}
