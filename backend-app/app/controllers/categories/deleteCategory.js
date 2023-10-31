const Category = require('../../models/category')
const Category2 = require('../../models/category-2')
const Category3 = require('../../models/category-3')
const model = require('../../models/image')
const {matchedData} = require('express-validator')
const {isIDGood, handleError} = require('../../middleware/utils')
const {deleteItem, deleteItemImage, getItem} = require('../../middleware/db')
/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteCategory = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const getCategory = await getItem(id, Category)
    const getImage = await getItem(getCategory?.imageId, model)
    const getIcon = await getItem(getCategory?.iconId, model)
    const delImage = await deleteItemImage(
      getImage?._id,
      'categories',
      getImage?.path
    )
    const delIcon = await deleteItemImage(
      getIcon?._id,
      'categories',
      getIcon?.path
    )
    if (!delImage || !delIcon) {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
    res.status(200).json(await deleteItem(id, Category))
  } catch (error) {
    handleError(res, error)
  }
}

const deleteCategory2 = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const getCategory = await getItem(id, Category2)
    const getImage = await getItem(getCategory?.imageId, model)
    const getIcon = await getItem(getCategory?.iconId, model)
    const delImage = await deleteItemImage(
      getImage?._id,
      'categories',
      getImage?.path
    )
    const delIcon = await deleteItemImage(
      getIcon?._id,
      'categories',
      getIcon?.path
    )
    if (!delImage || !delIcon) {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
    res.status(200).json(await deleteItem(id, Category2))
  } catch (error) {
    handleError(res, error)
  }
}

const deleteCategory3 = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const getCategory = await getItem(id, Category3)
    const getImage = await getItem(getCategory?.imageId, model)
    const getIcon = await getItem(getCategory?.iconId, model)
    const delImage = await deleteItemImage(
      getImage?._id,
      'categories',
      getImage?.path
    )
    const delIcon = await deleteItemImage(
      getIcon?._id,
      'categories',
      getIcon?.path
    )
    if (!delImage || !delIcon) {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
    res.status(200).json(await deleteItem(id, Category3))
  } catch (error) {
    handleError(res, error)
  }
}
module.exports = {deleteCategory, deleteCategory2, deleteCategory3}
