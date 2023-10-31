const Seller = require('../../models/seller')
const {matchedData} = require('express-validator')
const {isIDGood, handleError} = require('../../middleware/utils')
const {updateItem} = require('../../middleware/db')
/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteSeller = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const delSeller = await updateItem(id, Seller, req)
    if (delSeller) {
      res.status(200).json('Ok')
    } else {
      handleError(res, {code: 422, message: 'ERROR_OCCURED'})
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {deleteSeller}
