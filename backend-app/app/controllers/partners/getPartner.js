const {matchedData} = require('express-validator')
const Partner = require('../../models/partner')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populatePartner} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getPartner = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Partner, populatePartner))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getPartner}
