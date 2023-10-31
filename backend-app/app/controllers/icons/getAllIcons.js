const Icon = require('../../models/icon')
const {checkQueryString, getItems} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {populateIcon} = require('./validators')
/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllIcons = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Icon, query, populateIcon))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getAllIcons}
