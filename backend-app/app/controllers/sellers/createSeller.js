const Seller = require('../../models/seller')
const {createItem} = require('../../middleware/db')
const {handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {populateSeller} = require('./validators')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createSeller = async (req, res) => {
  try {
    const {firstName, lastName} = req.body.personnalInfo
    req = matchedData(req)
    res.status(201).json(
      await createItem(
        {
          ...req,
          personnalInfo: {
            ...req.personnalInfo,
            fullName: `${firstName} ${lastName}`
          }
        },
        Seller,
        populateSeller
      )
    )
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {createSeller}
