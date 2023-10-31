const blog = require('../../../models/blog')
const {buildErrObject} = require('../../../middleware/utils')
const {populateBlog} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const commentBlogInDb = (id = '', blogId = '', comment = '') => {
  return new Promise((resolve, reject) => {
    blog
      .findByIdAndUpdate(
        blogId,
        {
          $push: {
            comments: {
              comment,
              postedBy: id,
              postedAt: new Date()
            }
          }
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

module.exports = {commentBlogInDb}
