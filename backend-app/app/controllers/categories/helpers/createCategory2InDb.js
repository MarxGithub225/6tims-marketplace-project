const Category = require('../../../models/category')
const Category2 = require('../../../models/category-2')
const {getItem} = require('../../../middleware/db')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createCategory2InDb = (req = {}) => {
  return new Promise((resolve, reject) => {
    Category2.create(req, async (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      const getCategory = await getItem(req?.categoryId, Category)
      if (!getCategory) {
        reject(buildErrObject(422, 'NOT_FOUND_CATEGORY'))
      }
      const list = [...getCategory.subCategory2Ids]
      list.push(item._id)
      const updatedCategory = await Category.findByIdAndUpdate(
        req?.categoryId,
        {subCategory2Ids: list},
        {
          new: true
        }
      )

      if (!updatedCategory) {
        reject(buildErrObject(422, 'ERROR_OCCURED'))
      }
      resolve(item)
    })
  })
}

module.exports = {createCategory2InDb}
