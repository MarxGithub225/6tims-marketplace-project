const model = require('../../models/icon')
const {handleError} = require('../../middleware/utils')
const fs = require('fs')
const {deleteItem} = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteIcon = async (req, res) => {
  try {
    const id = req.params.id
    const path = req.params.path
    fs.unlinkSync('public/files/' + `icons/${path}`)
    res.status(200).json(await deleteItem(id, model))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {deleteIcon}
