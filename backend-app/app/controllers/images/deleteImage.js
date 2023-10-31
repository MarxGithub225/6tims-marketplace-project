const model = require('../../models/image')
const {handleError} = require('../../middleware/utils')
const fs = require('fs')
const {deleteItem} = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteImage = async (req, res) => {
  try {
    const id = req.params.id
    const folder = req.params.folder
    const path = req.params.path
    fs.unlinkSync('public/files/' + `${folder}/${path}`)
    res.status(200).json(await deleteItem(id, model))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {deleteImage}
