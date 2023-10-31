const product = require('../../../models/product')
const {buildErrObject, itemNotFound} = require('../../../middleware/utils')
const {populateProduct} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const commentProductInDb = (
  id = '',
  productId = '',
  comment = '',
  star = 1
) => {
  return new Promise((resolve, reject) => {
    product.findById(productId, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND_PRODUCT')
        const alreadyRated = item.ratings.find(
          (userId) => userId.postedby.toString() === id.toString()
        )
        if (alreadyRated) {
          await product.updateOne(
            {
              ratings: {$elemMatch: alreadyRated}
            },
            {
              $set: {
                'ratings.$.star': star,
                'ratings.$.comment': comment,
                'ratings.$.postedAt': new Date()
              }
            },
            {
              new: true
            }
          )
        } else {
          await product.findByIdAndUpdate(
            productId,
            {
              $push: {
                ratings: {
                  star,
                  comment,
                  postedby: id,
                  postedAt: new Date()
                },
                historical: {
                  type: 'comment',
                  variable: '',
                  sku: '',
                  actedBy: id,
                  actedAt: new Date()
                }
              }
            },
            {
              new: true
            }
          )
        }
        const getallratings = await product.findById(productId)
        const totalRating = getallratings.ratings.length
        const ratingsum = getallratings.ratings
          .map((rateItem) => rateItem.star)
          .reduce((prev, curr) => prev + curr, 0)
        const actualRating = Math.round(ratingsum / totalRating)
        product
          .findByIdAndUpdate(
            productId,
            {
              totalrating: actualRating
            },
            {new: true},
            (error, items) => {
              if (error) {
                return reject(buildErrObject(422, error.message))
              }
              resolve(items)
            }
          )
          .populate(populateProduct)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = {commentProductInDb}
