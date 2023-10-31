const {handleError, isIDGood} = require('../../middleware/utils')
const {likeBlogInDb} = require('./helpers/likeBlogInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const likeBlog = async (req, res) => {
  try {
    const id = await isIDGood(req.user._id)
    const blogId = await isIDGood(req.params.blogId)
    res.status(201).json(await likeBlogInDb(id, blogId))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {likeBlog}
