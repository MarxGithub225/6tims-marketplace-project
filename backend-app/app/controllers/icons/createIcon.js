const {handleError} = require('../../middleware/utils')
const {createIconInDb} = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createIcon = async (req, res) => {
  try {
    const data = req.user
      ? {
          createdBy: req.user._id
        }
      : {createdBy: null}
    const file = req.file.filename
    const item = await createIconInDb({...data, file})
    res.status(201).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createIcon}
