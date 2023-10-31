const blog = require('../../../models/blog')
const {buildErrObject} = require('../../../middleware/utils')
const {populateBlog} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const updateBlogViewsInDb = (id = '') => {
  return new Promise((resolve, reject) => {
    blog
      .findByIdAndUpdate(
        id,
        {
          $inc: {viewsCount: 1}
        },
        {
          new: true
        },
        (err, items) => {
          if (err) {
            return reject(buildErrObject(422, err.message))
          }
          resolve(items)
        }
      )
      .populate(populateBlog)
  })
}

module.exports = {updateBlogViewsInDb}
