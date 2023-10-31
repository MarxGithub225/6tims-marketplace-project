const {matchedData} = require('express-validator')
const Banner = require('../../models/banner')
const {getItem} = require('../../middleware/db')
const {isIDGood, handleError} = require('../../middleware/utils')
const {populateBanner} = require('./validators')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBanner = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Banner, populateBanner))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {getBanner}
