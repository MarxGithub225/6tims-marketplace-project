const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {updateBlogViewsInDb} = require('./helpers/updateBlogViewsInDb')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBlogView = async (req, res) => {
  try {
    req = matchedData(req)
    const blogId = await isIDGood(req.params.blogId)
    res.status(201).json(await updateBlogViewsInDb(blogId))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateBlogView}
