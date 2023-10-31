const {handleError} = require('../../middleware/utils')
const {createImageInDb} = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createImage = async (req, res) => {
  console.log('req', req)
  try {
    const data = req.user
      ? {
          createdBy: req.user._id
        }
      : {createdBy: null}
    const file = req.file.filename
    const item = await createImageInDb({...data, file})
    res.status(201).json(item)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createImage}
