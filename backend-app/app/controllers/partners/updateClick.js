const {matchedData} = require('express-validator')
const {handleError, isIDGood} = require('../../middleware/utils')
const {updateClicksInDb} = require('./helpers')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateClick = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(201).json(await updateClicksInDb(id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {
  updateClick
}
