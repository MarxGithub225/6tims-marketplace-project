/* eslint-disable max-statements */
const Category = require('../../../models/category')
const Category2 = require('../../../models/category-2')
const Category3 = require('../../../models/category-3')
const {getItem} = require('../../../middleware/db')
const {buildErrObject} = require('../../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createCategory3InDb = (req = {}) => {
  return new Promise((resolve, reject) => {
    Category3.create(req, async (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      const getCategory = await getItem(req?.categoryId, Category)
      if (!getCategory) {
        reject(buildErrObject(422, 'NOT_FOUND_CATEGORY'))
      }
      const getCategory2 = await getItem(req?.category2Id, Category2)
      if (!getCategory2) {
        reject(buildErrObject(422, 'NOT_FOUND_CATEGORY_2'))
      }
      const listCategory = [...getCategory.subCategory3Ids]
      const listCategory2 = [...getCategory2.subCategory3Ids]
      listCategory.push(item._id)
      listCategory2.push(item._id)
      const updatedCategory = await Category.findByIdAndUpdate(
        req?.categoryId,
        {subCategory3Ids: listCategory},
        {
          new: true
        }
      )
      if (!updatedCategory) {
        reject(buildErrObject(422, 'ERROR_OCCURED'))
      }
      const updatedCategory2 = await Category2.findByIdAndUpdate(
        req?.category2Id,
        {subCategory3Ids: listCategory2},
        {
          new: true
        }
      )

      if (!updatedCategory2) {
        reject(buildErrObject(422, 'ERROR_OCCURED'))
      }
      resolve(item)
    })
  })
}

module.exports = {createCategory3InDb}
