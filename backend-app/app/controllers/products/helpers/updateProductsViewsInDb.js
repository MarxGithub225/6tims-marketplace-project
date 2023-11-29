const product = require('../../../models/product')
const user = require('../../../models/user')
const {buildErrObject, itemNotFound} = require('../../../middleware/utils')
const {populateProduct} = require('../validators')
const {populateUser} = require('../../users/validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const updateProductsViewsInDb = (id = '', productId = '') => {
  if (id) {
    return new Promise((resolve, reject) => {
      user.findById(id, async (err, item) => {
        try {
          let userDataReturn = null
          await itemNotFound(err, item, 'NOT_FOUND_USER')
          const alreadyviewed = item.viewedListIds.find(
            (pdtId) => pdtId.toString() === productId
          )
          if (!alreadyviewed) {
            const userData = await user
              .findByIdAndUpdate(
                id,
                {
                  $push: {viewedListIds: productId}
                },
                {
                  new: true
                }
              )
              .populate(populateUser)
              .select('-password')
            userDataReturn = userData
          }
          product.findByIdAndUpdate(
            productId,
            {
              $push: {
                historical: {
                  type: 'view',
                  variables: [],
                  actedBy: id,
                  actedAt: new Date()
                }
              },
              $inc: {viewsCount: 1}
            },
            {
              new: true
            },
            (error) => {
              if (error) {
                return reject(buildErrObject(422, error.message))
              }
              resolve(userDataReturn)
            }
          )
        } catch (error) {
          reject(error)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      product
        .findByIdAndUpdate(
          productId,
          {
            $push: {
              historical: {
                type: 'view',
                actedBy: null,
                variables: [],
                actedAt: new Date()
              }
            },
            $inc: {viewsCount: 1}
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
        .populate(populateProduct)
    })
  }
}

module.exports = {updateProductsViewsInDb}
