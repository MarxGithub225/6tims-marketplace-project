const Partner = require('../../models/partner')
const model = require('../../models/image')
const {matchedData} = require('express-validator')
const {isIDGood, handleError} = require('../../middleware/utils')
const {deleteItem, deleteItemImage, getItem} = require('../../middleware/db')
/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deletePartner = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const getPartner = await getItem(id, Partner)
    const getImage = await getItem(getPartner?.imageId, model)
    const delImage = await deleteItemImage(
      getImage?._id,
      'brands',
      getImage?.path
    )
    if (!delImage) {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
    res.status(200).json(await deleteItem(id, Partner))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {deletePartner}
