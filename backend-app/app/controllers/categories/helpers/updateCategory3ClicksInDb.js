const category = require('../../../models/category-3')
const {buildErrObject} = require('../../../middleware/utils')
const {populateBanner} = require('../validators')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const updateCategory3ClicksInDb = (id = '') => {
  return new Promise((resolve, reject) => {
    category
      .findByIdAndUpdate(
        id,
        {
          $inc: {clicksNumber: 1}
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
      .populate(populateBanner)
  })
}

module.exports = {updateCategory3ClicksInDb}
