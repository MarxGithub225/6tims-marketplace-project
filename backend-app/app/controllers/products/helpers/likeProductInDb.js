const user = require('../../../models/user')
const product = require('../../../models/product')
const {buildErrObject, itemNotFound} = require('../../../middleware/utils')
const {populateUser} = require('../../users/validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const likeProductInDb = (id = '', productId = '') => {
  return new Promise((resolve, reject) => {
    user.findById(id, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND_USER')
        const alreadyliked = item.wishListIds.find(
          (pdtId) => pdtId.toString() === productId
        )
        if (alreadyliked) {
          user
            .findByIdAndUpdate(
              id,
              {
                $pull: {wishListIds: productId}
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
          await product.findByIdAndUpdate(
            productId,
            {
              $push: {
                historical: {
                  type: 'like',
                  variables: [],
                  actedBy: id,
                  actedAt: new Date()
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
                $push: {
                  wishListIds: productId
                }
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

module.exports = {likeProductInDb}
