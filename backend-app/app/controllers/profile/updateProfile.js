const {isIDGood, handleError} = require('../../middleware/utils')
const {matchedData} = require('express-validator')
const {updateProfileInDB} = require('./helpers')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
  try {
    const {firstName: name} = req.body
    const id = await isIDGood(req.user._id)
    req = matchedData(req)
    req = {...req, fullName: `${name} ${req.lastName}`}
    res.status(200).json(await updateProfileInDB(req, id))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateProfile}
