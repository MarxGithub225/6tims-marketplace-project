const order = require('../../../models/order')
const product = require('../../../models/product')
const {buildErrObject} = require('../../../middleware/utils')
const {populateBlog} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createOrderInDb = (id = '', req) => {
  return new Promise((resolve, reject) => {
    order
      .create(
        {
          ...req,
          createdBy: id,
          updatedBy: id,
          historical: [{type: 'order', createdAt: new Date()}]
        },
        async (err, item) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          await Promise.all(
            req?.products.map(async (pdtItem) => {
              const thePdt = await product.findByIdAndUpdate(
                pdtItem?.id,
                {
                  $push: {
                    historical: {
                      type: 'sell',
                      actedBy: id,
                      variable: pdtItem?.label,
                      sku: pdtItem?.sku,
                      actedAt: new Date()
                    }
                  },
                  $inc: {purchaseCount: Number(pdtItem?.quantity)}
                },
                {
                  new: true
                }
              )
              const getVariable = thePdt.variables.find(
                (variable) =>
                  variable.sku.toString() === pdtItem?.sku.toString()
              )
              await product.updateOne(
                {
                  variables: {$elemMatch: getVariable}
                },
                {
                  $inc: {quantity: -Number(pdtItem?.quantity)}
                },
                {
                  new: true
                }
              )
            })
          )
          resolve(item)
        }
      )
      .populate(populateBlog)
  })
}

module.exports = {createOrderInDb}
