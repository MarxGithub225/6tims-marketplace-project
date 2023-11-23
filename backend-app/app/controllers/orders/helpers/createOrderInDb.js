const order = require('../../../models/order')
const product = require('../../../models/product')
const {buildErrObject} = require('../../../middleware/utils')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createOrderInDb = (id = '', req) => {
  return new Promise((resolve, reject) => {
    order.create(
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
              pdtItem?._id,
              {
                $push: {
                  historical: {
                    type: 'sell',
                    actedBy: id,
                    variable: pdtItem?.variables,
                    actedAt: new Date()
                  }
                },
                $inc: {purchaseCount: Number(pdtItem?.totalQty)}
              },
              {
                new: true
              }
            )
            pdtItem?.variables?.forEach(async (_the_variable) => {
              const getVariable = thePdt.variables.find(
                (variable) =>
                  variable.sku.toString() === _the_variable?.sku.toString()
              )
              await product.updateOne(
                {
                  variables: {$elemMatch: getVariable}
                },
                {
                  $inc: {quantity: -Number(_the_variable?.quantity)}
                },
                {
                  new: true
                }
              )
            })
          })
        )
        resolve(item)
      }
    )
  })
}

module.exports = {createOrderInDb}
