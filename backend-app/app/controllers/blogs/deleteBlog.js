const Blog = require('../../models/blog')
const model = require('../../models/image')
const {matchedData} = require('express-validator')
const {isIDGood, handleError} = require('../../middleware/utils')
const {deleteItem, deleteItemImage, getItem} = require('../../middleware/db')
/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteBlog = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const getBlog = await getItem(id, Blog)
    const getImage = await getItem(getBlog?.imageId, model)
    const getLargeImage = await getItem(getBlog?.largeImageId, model)
    const delImage = await deleteItemImage(
      getImage?._id,
      'blogs',
      getImage?.path
    )
    const delLargeImage = await deleteItemImage(
      getLargeImage?._id,
      'blogs',
      getLargeImage?.path
    )

    if (!delImage || !delLargeImage) {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
    res.status(200).json(await deleteItem(id, Blog))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {deleteBlog}
