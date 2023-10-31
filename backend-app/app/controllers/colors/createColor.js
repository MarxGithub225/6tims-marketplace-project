const Color = require('../../models/color')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')

const {populateColor} = require('./validators')
/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createColor = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Color, populateColor))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createColor}
