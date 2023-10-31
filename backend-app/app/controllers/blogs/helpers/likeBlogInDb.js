const user = require('../../../models/user')
const blog = require('../../../models/blog')
const {itemNotFound, buildErrObject} = require('../../../middleware/utils')
const {populateUser} = require('../../users/validators')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const likeBlogInDb = (id = '', blogId = '') => {
  return new Promise((resolve, reject) => {
    user.findById(id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND_USER')
        const alreadyliked = item.blogListIds.find(
          (bloId) => bloId.toString() === blogId
        )
        if (alreadyliked) {
          await blog.findByIdAndUpdate(
            blogId,
            {
              $pull: {
                likes: {likedBy: id}
              }
            },
            {
              new: true
            }
          )

          user
            .findByIdAndUpdate(
              id,
              {
                $pull: {blogListIds: blogId}
              },
              {
                new: true
              },
              (error, items) => {
                if (error) {
                  return reject(buildErrObject(422, error.message))
                }
                resolve(items)
              }
            )
            .populate(populateUser)
            .select('-password')
        } else {
          await blog.findByIdAndUpdate(
            blogId,
            {
              $push: {
                likes: {
                  likedBy: id,
                  likedAt: new Date()
                }
              }
            },
            {
              new: true
            }
          )

          user
            .findByIdAndUpdate(
              id,
              {
                $push: {blogListIds: blogId}
              },
              {
                new: true
              },
              (error, items) => {
                if (error) {
                  return reject(buildErrObject(422, error.message))
                }
                resolve(items)
              }
            )
            .populate(populateUser)
            .select('-password')
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {likeBlogInDb}
