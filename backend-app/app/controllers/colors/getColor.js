const {matchedData} = require('express-validator')
const Color = require('../../models/color')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')

const {populateColor} = require('./validators')
/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getColor = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Color, populateColor))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getColor}
