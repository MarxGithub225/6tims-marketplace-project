const User = require('../../models/user')
const {matchedData} = require('express-validator')
const {isIDGood, handleError} = require('../../middleware/utils')
const {updateItem} = require('../../middleware/db')
const {emailExistsExcludingMyself} = require('../../middleware/emailer')
const {populateUser} = require('./validators')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
  try {
    const {firstName: name} = req.body
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesEmailExists = await emailExistsExcludingMyself(id, req.email)
    if (!doesEmailExists) {
      req = {...req, firstName: name, fullName: `${name} ${req.lastName}`}
      res.status(200).json(await updateItem(id, User, req, populateUser))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = {updateUser}
