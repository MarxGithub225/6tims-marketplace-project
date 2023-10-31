const Refuse = require('../../models/product-refuse')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateRefuse} = require('./validators')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createRefuse = async (req, res) => {
  try {
    const data = {
      createdBy: req.user._id,
      updatedBy: req.user._id
    }
    req = matchedData(req)
    res
      .status(201)
      .json(await createItem({...req, ...data}, Refuse, populateRefuse))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createRefuse}
